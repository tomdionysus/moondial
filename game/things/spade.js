const Thing = require('../../lib/Thing')

module.exports = class Spade extends Thing {
	constructor(options) {
		options.id = 'spade'
		options.description = 'Well, I call it a shovel.'
		
		super(options)
	}

	init() {
	}

	afterTake(cmd) {
		cmd.actor.allowAction('dig')
	}

	afterDrop(cmd) {
		cmd.actor.preventAction('dig')
	}
}