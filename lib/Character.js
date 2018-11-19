const HasActions = require('./HasActions')

module.exports = class Character {
	constructor(options) {
		options = options || {}
		this.gameEngine = options.gameEngine
		this.description = options.description
		this.things = options.things || {} 

		HasActions(this, options.actions)
		this.actions.look = this.actionLook.bind(this)
		this.actions.examine = this.actionExamine.bind(this)
		this.actions.inventory = this.actionInventory.bind(this)
		this.actions.take = this.actionTake.bind(this)
		this.actions.drop = this.actionDrop.bind(this)
	}

	setDescription(description) {
		this.description = description
	}

	addThing(thingId) {
		var thing = this.gameEngine.getThing(thingId)
		this.things[thingId] = thing
		thing.container = this
	}

	removeThing(thingId) {
		delete this.things[thingId]
		this.location.addThing(thingId)
	}

	setLocation(locationId) {
		this.location = this.gameEngine.getLocation(locationId)
	}

	actionLook() {
		this.gameEngine.writeLine()
		this.gameEngine.writeLine(this.location.description)
		this.gameEngine.writeLine()
		this.gameEngine.writeLine('You can see: '+this.location.getThings().join(', '))
		this.gameEngine.writeLine('You can go: '+this.location.getDirections().join(', '))
	}

	actionExamine(parsed) {
		var thingId = parsed.shift()
		if(!thingId) return this.gameEngine.writeLine('Examine what?')

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

	actionTake(parsed) {
		var thingId = parsed.shift()
		if(!thingId) return this.gameEngine.writeLine('Take what?')

		if(this.location.things[thingId]) {
			if(this.gameEngine.getThing(thingId).can('take')) {
				this.gameEngine.writeLine('You take '+thingId+'.')
				this.location.removeThing(thingId)
				return this.addThing(thingId)
			}
		}
		this.gameEngine.writeLine('You cannot take '+thingId+'.')
	}

	actionDrop(parsed) {
		var thingId = parsed.shift()
		if(!thingId) return this.gameEngine.writeLine('Drop what?')

		if(this.things[thingId]) {
			if(this.gameEngine.getThing(thingId).can('drop')) {
				this.gameEngine.writeLine('You drop '+thingId+'.')
				return this.removeThing(thingId)
			}
		}
	}
}