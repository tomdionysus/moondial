const HasActions = require('./HasActions')
const HasThings = require('./HasThings')

module.exports = class Location {
	constructor(options) {
		options = options || {}

		this.id = options.id
		this.gameEngine = options.gameEngine
		this.description = options.description
		this.directions = options.directions || {}

		this.characters = options.characters || {}

		HasActions(this, options)
		HasThings(this, options)

		this.allowAction('debug')
		this.allowAction('look')
		this.allowAction('take')
	}

	setDescription(description) {
		this.description = description
	}

	addDirection(direction, locationId) {
		this.directions[direction] = locationId
	}

	getDirection(direction) {
		return this.directions[direction]
	}

	getDirections() {
		return Object.keys(this.directions)
	}

	addCharacter(id) {
		var c = this.gameEngine.getCharacter(id)
		if(c.location) c.location.removeCharacter(id)
		this.characters[id] = c
		c.setLocation(this.id)
	}

	removeCharacter(id) {
		delete this.characters[id]
		var c = this.gameEngine.getCharacter(id)
		if(!c) return
		delete c.location
	}

	containsCharacter(id) {
		return !!this.characters[id]
	}

	getVisibleCharacters() {
		var out = []
		for(var i in this.characters) { 
			if(this.characters[i].isVisible()) out.push(i)
		}
		return out
	}
}