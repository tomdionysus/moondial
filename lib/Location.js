const HasActions = require('./HasActions')
const HasThings = require('./HasThings')
const GameObject = require('./GameObject')

module.exports = class Location extends GameObject {
	constructor(options) {
		super(options)

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
		if(this.characters[id]==c) return
		this.characters[id] = c
		c.setLocation(this.id)
	}

	removeCharacter(id) {
		delete this.characters[id]
		var c = this.gameEngine.getCharacter(id)
		c.setLocation(null)
	}

	containsCharacter(id) {
		return !!this.characters[id]
	}

	getVisibleCharacters(exclude) {
		exclude = exclude || {}
		var out = []
		for(var i in this.characters) { 
			if(exclude[i]) continue
			if(this.characters[i].isVisible()) out.push(i)
		}
		return out
	}

	containsPlayer() {
		return this.gameEngine.player.location.id == this.id
	}

	serialize(obj = {}) {
		super.serialize(obj)
		obj.data.characters = []
		for(let x in this.characters) obj.data.characters.push(x)
		obj.data.directions = this.directions
		return obj
	}

	deserialize(obj) {
		super.deserialize(obj)
		this.directions = obj.data.directions
		this.characters = {}
		for(let x in obj.data.characters) this.characters[obj.data.characters[x]] = this.gameEngine.getCharacter(obj.data.characters[x])
	}
}