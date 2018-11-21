const path = require('path')
const GameEngine = require('../lib/GameEngine')

class Moondial extends GameEngine {
	constructor(options) {
		options = options || {}
		super(options)

		this.loadCommands(path.join(__dirname,'commands'))

		this.loadThings(path.join(__dirname,'things'))
		this.loadCharacters(path.join(__dirname,'characters'))
		this.loadLocations(path.join(__dirname,'locations'))
		
		this.bootThings()
		this.bootCharacters()
		this.bootLocations()
	}

	start() {
		this.writeLine('---------------------------------')
		this.writeLine('            Moondial')
		this.writeLine('---------------------------------')
		this.writeLine()
		this.writeLine('Written By Tom Cully & Niki Steel')
		this.writeLine()

		this.player.setLocation('courtyard')
		this.player.addThing('satchel')

		super.start()
	}
}

module.exports = Moondial