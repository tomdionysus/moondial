const Location = require('../../lib/Location')

module.exports = class Maze extends Location {
	constructor(options) {
		options.id = 'maze'
		options.description = 'An ancient hedge maze looms into the darkness. it looks a bit creepy.'

		super(options)
	}

	init() {
		this.addDirection('north','lawns')

		this.addCharacter('danjite')
	}
}