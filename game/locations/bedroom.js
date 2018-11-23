const Location = require('../../lib/Location')

module.exports = class Bedroom extends Location {
	constructor(options) {
		options.id = 'bedroom'
		options.description = 'The roof bedroom is mostly complete, the tattered drapes of an old four-posted bed blow in the wind. A weathered writing desk sits in the corner'

		super(options)
	}

	init() {
		this.addThing('desk')
		this.addCharacter('ghost')
		
		this.addDirection('down','mansion')
	}
}