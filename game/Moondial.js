const path = require('path')
const GameEngine = require('../lib/GameEngine')

class Moondial extends GameEngine {
	constructor(options) {
		options = options || {}
		super(options)

		this.loadCharacters(path.join(__dirname,'characters'))
		this.loadThings(path.join(__dirname,'things'))
		this.loadLocations(path.join(__dirname,'locations'))
		
		this.bootCharacters()
		this.bootThings()
		this.bootLocations()
	}

	start() {
		this.writeLine('-------------------')
		this.writeLine('Welcome to Moondial')
		this.writeLine('-------------------')
		this.writeLine()
		this.writeLine('Written By Tom Cully')

		this.player.setLocation('courtyard')
		this.player.addThing('satchel')
		
		super.start()
	}
}

module.exports = Moondial