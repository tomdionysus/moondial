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

		this.addAction('go', this.actionGo)
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

	addCharacter(id) {
		var c = this.gameEngine.getCharacter(id)
		if(c.location) c.location.removeCharacter(id)
		this.characters[id] = c
		c.setLocation(this.id)
	}

	removeCharacter(id) {
		var c = this.gameEngine.getCharacter(id)
		delete c.location
		delete this.characters[id]
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