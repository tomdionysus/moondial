const Location = require('../../lib/Location')

module.exports = class Courtyard extends Location {
	constructor(options) {
		options.id = 'courtyard'
		options.description = 'You are in a courtyard. This night air is clear and sharp, the moon shines high and bright in the sky. Well-tended lawns stretch away south, as the dark stone ruins of the mansion block the stars to the north.'

		super(options)
	}

	init() {
		this.addThing('moondial')
		this.addThing('gnomon')
		
		this.addCharacter('gallagher')

		this.addDirection('north','mansion')
		this.addDirection('south','lawns')
	}
}