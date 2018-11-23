const Thing = require('../../lib/Thing')

module.exports = class Key extends Thing {
	constructor(options) {
		options.id = 'key'
		options.description = 'A small iron key.'
		
		super(options)
	}

	init() {
		this.hide()
		this.addAfter('*', function(){ this.show() })
	}
}