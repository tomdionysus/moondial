const Thing = require('../../lib/Thing')

module.exports = class Gnomon extends Thing {
	constructor(options) {
		options.id = 'gnomon'
		options.description = 'The gnomon is a piece of metal about the length of your hand. It is made from steel with a little rust, and its tip is slightly bent.'
		
		super(options)
	}

	init() {
		this.hide()
		this.afterAction('*', function(){ this.show() })
	}
}