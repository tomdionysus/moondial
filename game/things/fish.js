const Thing = require('../../lib/Thing')

module.exports = class Fish extends Thing {
	constructor(options) {
		options.id = 'fish'
		options.description = 'A small cooked fish.'
		
		super(options)
	}
}