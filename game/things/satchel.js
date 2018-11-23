const Container = require('../../lib/Container')

module.exports = class Satchel extends Container {
	constructor(options) {
		options.id = 'satchel'
		options.description = 'The satchel is a sturdy bag made out of worn leather. It has a handy strap for carrying.'
		
		super(options)
	}

	init() {
		this.preventAction('give')
		this.preventAction('drop')
	}
}