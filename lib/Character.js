const Container = require('./Container')
const HasActions = require('./HasActions')
const HasThings = require('./HasThings')

module.exports = class Character {
	constructor(options) {
		options = options || {}
		this.gameEngine = options.gameEngine
		this.description = options.description
		this.things = options.things || {}

		HasActions(this, options)
		HasThings(this, options)

		this.addAction('look',this.actionLook)
		this.addAction('examine',this.actionExamine)
		this.addAction('inventory',this.actionInventory)
		this.addAction('put',this.actionPut)
		this.addAction('search',this.actionSearch)
		this.addAction('take',this.actionTake)
		this.addAction('drop',this.actionDrop)
	}

	setDescription(description) {
		this.description = description
	}
	
	setLocation(locationId) {
		this.location = this.gameEngine.getLocation(locationId)
	}

	actionLook() {
		this.gameEngine.writeLine()
		this.gameEngine.writeLine(this.location.description)
		this.gameEngine.writeLine()
		this.gameEngine.writeLine('You can see: '+this.location.getVisibleThings().join(', '))
		this.gameEngine.writeLine('You can go: '+this.location.getDirections().join(', '))
	}

	actionExamine(parsed) {
		var thingId = parsed.shift()
		if(!thingId) return this.gameEngine.writeLine('Examine what?')

		if(!this.contains(thingId) && !this.location.contains(thingId)) return this.gameEngine.writeLine('You don\'t have '+thingId+'.')

		if(this.things[thingId]) {
			this.gameEngine.writeLine('You examine '+thingId+'.')
			this.gameEngine.writeLine(this.things[thingId].description)
			return
		}
		if(this.location.things[thingId]) {
			this.gameEngine.writeLine('You examine '+thingId+'.')
			this.gameEngine.writeLine(this.location.things[thingId].description)
			return
		}
		this.gameEngine.writeLine('You cannot examine '+thingId+'.')
	}

	actionInventory() {
		this.gameEngine.writeLine('You are carrying: '+Object.keys(this.things).join(', '))
	}

	actionPut(parsed) {
		var thingId = parsed.shift()
		if(!thingId) return this.gameEngine.writeLine('Put what?')
		var inCmd = parsed.shift()
		if(!inCmd || inCmd!='in') return this.gameEngine.writeLine('Put '+thingId+' in what?')
		var inThingId = parsed.shift()
		if(!inThingId) return this.gameEngine.writeLine('Put '+thingId+' in what?')

		if(!this.contains(thingId) && !this.location.contains(thingId)) return this.gameEngine.writeLine('You don\'t have '+thingId+'.')
		if(!this.contains(inThingId) && !this.location.contains(inThingId)) return this.gameEngine.writeLine('You don\'t have '+inThingId+'.')

		var thing = this.gameEngine.getThing(thingId)
		var inThing = this.gameEngine.getThing(inThingId)

		if(!(inThing instanceof Container)) return this.gameEngine.writeLine('You can\t put '+thingId+' into '+inThingId+'.')

		this.gameEngine.writeLine('You put '+thing.id+' in '+inThing.id+'.')
		thing.location.removeThing(thingId)
		inThing.addThing(thingId)
	}

	actionSearch(parsed) {
		var inThingId = parsed.shift()
		if(!inThingId) return this.gameEngine.writeLine('Search what?')

		if(!this.contains(inThingId) && !this.location.contains(inThingId)) return this.gameEngine.writeLine('You don\'t have '+inThingId+'.')

		var inThing = this.gameEngine.getThing(inThingId)

		if(!inThing.can('search')) return this.gameEngine.writeLine('You can\'t search '+inThingId+'.')
		inThing.do('search')
	}

	actionDrop(parsed) {
		var thingId = parsed.shift()
		if(!thingId) return this.gameEngine.writeLine('Drop what?')

		if(this.things[thingId]) {
			this.gameEngine.writeLine('You drop '+thingId+'.')
			this.player.removeThing(thingId)
			this.location.addThing(this.id)
		}
		this.gameEngine.writeLine('You don\'t have '+thingId+'.')
	}

	actionTake(parsed) {
		var thingId = parsed.shift()
		if(!thingId) return this.gameEngine.writeLine('Take what?')

		if(this.location.things[thingId]) {
			this.gameEngine.writeLine('You take '+thingId+'.')
			this.location.removeThing(thingId)
			this.addThing(thingId)
			return
		}
		this.gameEngine.writeLine('There is no '+thingId+'.')
		return true
	}
}