const Fixture = require('../../lib/Fixture')

module.exports = class Moondial extends Fixture {
	constructor(options) {
		options.id = 'moondial'
		options.description = 'The moondial is a large stone plinth with a faded white marble dial, the gnomon is blued steel with a touch of rust.'
		
		super(options)
	}
}