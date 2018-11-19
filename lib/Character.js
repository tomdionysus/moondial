const HasActions = require('./HasActions')
const HasThings = require('./HasThings')

module.exports = class Character {
	constructor(options) {
		options = options || {}
		this.gameEngine = options.gameEngine
		this.description = options.description

		HasThings(this, options.things)

		HasActions(this, options.actions)
		this.actions.look = this.actionLook.bind(this)
		this.actions.examine = this.actionExamine.bind(this)
		this.actions.inventory = this.actionInventory.bind(this)
		this.actions.drop = this.actionDrop.bind(this)
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

	actionDrop(parsed) {
		var thingId = parsed.shift()
		if(!thingId) return this.gameEngine.writeLine('Drop what?')

		if(this.things[thingId]) {
			var thing = this.gameEngine.getThing(thingId)
			if(thing.can('drop')) {
				return thing.do('drop')
			}
			return this.gameEngine.writeLine('You cannot drop '+thingId+'.')
		}
		this.gameEngine.writeLine('You don\'t have '+thingId+'.')
	}
}