module.exports = class Character {
	constructor(options) {
		options = options || {}
		this.gameEngine = options.gameEngine
		this.description = options.description
		this.things = options.things || {} 
	}

	setDescription(description) {
		this.description = description
	}

	addThing(id) {
		var thing = this.gameEngine.getThing(id)
		this.things[id] = thing
		thing.container = this
	}

	setLocation(id) {
		this.location = this.gameEngine.getLocation(id)
	}
}