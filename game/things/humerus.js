const Thing = require('../../lib/Thing')

module.exports = class Humerus extends Thing {
	constructor(options) {
		options.id = 'humerus'
		options.description = 'Part of an arm bone.'
		
		super(options)
	}

	init() {
	}
}