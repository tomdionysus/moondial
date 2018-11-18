const path = require('path')
const GameEngine = require('../lib/GameEngine')

class Moondial extends GameEngine {
	constructor(options) {
		options = options || {}
		super(options)

		this.loadThings(path.join(__dirname,'things'))
		this.loadLocations(path.join(__dirname,'locations'))
		this.bootThings()
		this.bootLocations()
	}

	start() {
		console.log('Moondial V1.0')
		console.log('')

		this.player.setLocation('courtyard')
		super.start()
		
	}
}

module.exports = Moondial