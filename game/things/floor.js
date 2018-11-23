const Fixture = require('../../lib/Fixture')

module.exports = class Floor extends Fixture {
	constructor(options) {
		options.id = 'floor'
		options.description = 'The mosaic floor is so broken up that you can\'t make out the image.'
		
		super(options)
	}
}