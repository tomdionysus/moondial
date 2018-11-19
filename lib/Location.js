const HasActions = require('./HasActions')

module.exports = class Location {
	constructor(options) {
		options = options || {}

		this.id = options.id
		this.gameEngine = options.gameEngine
		this.description = options.description
		this.directions = options.directions || {}
		this.things = options.things || {}

		HasActions(this, options.actions)
		this.actions.go = this.actionGo.bind(this)
	}

	setDescription(description) {
		this.description = description
	}

	addExit(direction, locationId) {
		this.directions[direction] = locationId
	}

	addThing(id) {
		var thing = this.gameEngine.getThing(id)
		this.things[id] = thing
		thing.container = this
	}

	removeThing(id) {
		var thing = this.gameEngine.getThing(id)
		delete this.things[id]
		delete thing.container
	}

	getThings() {
		return Object.keys(this.things)
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
}