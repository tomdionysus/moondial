const Thing = require('../../lib/Thing')

module.exports = class Calendar extends Thing {
	constructor(options) {
		options.id = 'calendar'
		options.description = 'A tatty calendar with pictures of dogs.'
		
		super(options)
	}
}