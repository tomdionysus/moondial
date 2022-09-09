const Location = require('../../lib/Location')

module.exports = class Lawns extends Location {
	constructor(options) {
		options.id = 'lawns'
		options.description = 'The lawns and flowerbeds are overgrown and shabby. A huge stone fountain sits at the crossroads of the paths.'

		super(options)
	}

	init() {
		this.addThing('fountain').addThing('fish')
		this.addCharacter('doggo')
		
		this.addDirection('north','courtyard')
		this.addDirection('south','maze')
		this.addDirection('west','cemetery')
	}
}