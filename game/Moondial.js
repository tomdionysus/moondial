const path = require('path')
const GameEngine = require('../lib/GameEngine')

class Moondial extends GameEngine {
	constructor(options) {
		options = options || {}
		super(options)
	}

	start() {
		this.writeLine('---------------------------------')
		this.writeLine('            Moondial')
		this.writeLine('---------------------------------')
		this.writeLine()
		this.writeLine('Written By Tom Cully & Niki Steel')
		this.writeLine()

		super.start()
	}

	init() {
		super.init()
		
		this.player.setLocation('courtyard')
		this.player.addThing('satchel')
		this.player.allowAction('inventory')
	}
}

module.exports = Moondial