const Container = require('./Container')
const HasActions = require('./HasActions')
const HasThings = require('./HasThings')

module.exports = class Character {
	constructor(options) {
		options = options || {}

		this.id = options.id
		this.gameEngine = options.gameEngine
		this.description = options.description

		this.attributes = options.attributes || {}

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
	
	setLocation(id) {
		if(this.location) this.location.removeCharacter(this.id)
		if(id==null) { delete this.location; return }
		this.location = this.gameEngine.getLocation(id)
	}

	actionLook() {
		this.gameEngine.writeLine()
		this.gameEngine.writeLine(this.location.description)
		this.gameEngine.writeLine()
		var p = this.location.getVisibleThings()
		var j = this.location.getVisibleCharacters()
		this.gameEngine.writeLine('You can see: '+p.concat(j).join(', '))
		this.gameEngine.writeLine('You can go: '+this.location.getDirections().join(', '))
	}

	actionExamine(parsed) {
		var thingId = parsed.shift()
		if(!thingId) return this.gameEngine.writeLine('Examine what?')

		if(this.containsThing(thingId)) {
			this.gameEngine.writeLine('You examine '+thingId+'.')
			this.gameEngine.writeLine(this.things[thingId].description)
			return
		}
		if(this.location.containsThing(thingId)) {
			this.gameEngine.writeLine('You examine '+thingId+'.')
			this.gameEngine.writeLine(this.location.things[thingId].description)
			return
		}
		if(this.location.containsCharacter(thingId)) {
			this.gameEngine.writeLine('You examine '+thingId+'.')
			this.gameEngine.writeLine(this.location.characters[thingId].description)
			return
		}
		this.gameEngine.writeLine('There\'s no '+thingId+'.')
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

		if(!this.containsThing(thingId) && !this.location.containsThing(thingId)) return this.gameEngine.writeLine('You don\'t have '+thingId+'.')
		if(!this.containsThing(inThingId) && !this.location.containsThing(inThingId)) return this.gameEngine.writeLine('You don\'t have '+inThingId+'.')

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

		if(!this.containsThing(inThingId) && !this.location.containsThing(inThingId)) return this.gameEngine.writeLine('You don\'t have '+inThingId+'.')

		var inThing = this.gameEngine.getThing(inThingId)

		if(!inThing.can('search')) return this.gameEngine.writeLine('You can\'t search '+inThingId+'.')
		inThing.do('search')
	}

	actionDrop(parsed) {
		var thingId = parsed.shift()
		if(!thingId) return this.gameEngine.writeLine('Drop what?')

		if(this.containsThing(thingId)) {
			this.gameEngine.writeLine('You drop '+thingId+'.')
			this.removeThing(thingId)
			this.location.addThing(thingId)
			return
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

	isVisible() {
		return !this.attributes.hidden
	}

	hide() {
		this.attributes.hidden = true
	}

	show() {
		this.attributes.hidden = false
	}
}