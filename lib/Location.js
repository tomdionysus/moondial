const HasActions = require('./HasActions')
const HasThings = require('./HasThings')

module.exports = class Location {
	constructor(options) {
		options = options || {}

		this.id = options.id
		this.gameEngine = options.gameEngine
		this.description = options.description
		this.directions = options.directions || {}

		HasThings(this, options.things)

		HasActions(this, options.actions)
		this.addAction('go',this.actionGo)
		this.addAction('take',this.actionTake)
	}

	setDescription(description) {
		this.description = description
	}

	addExit(direction, locationId) {
		this.directions[direction] = locationId
	}

	getDirections() {
		return Object.keys(this.directions)
	}

	actionGo(parsed) {
		var dir = parsed.shift()
		if(!dir) return console.log('Go where?')

		if(this.directions[dir]) {
			console.log('You go '+dir+'.')
			this.gameEngine.player.setLocation(this.directions[dir])
			this.gameEngine.player.actionLook()
			return true
		}
		console.log('You cannot go '+dir+'.')
		return true
	}

	actionTake(parsed) {
		var thingId = parsed.shift()
		if(!thingId) return this.gameEngine.writeLine('Take what?')

		if(this.things[thingId]) {
			var thing = this.gameEngine.getThing(thingId)
			if(thing.can('take')) { 
				return thing.do('take')
			}
			return this.gameEngine.writeLine('You cannot take '+thingId+'.')
		}
		this.gameEngine.writeLine('There is no '+thingId+'.')
	}
}