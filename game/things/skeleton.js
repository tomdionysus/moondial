const Container = require('../../lib/Container')

module.exports = class Skeleton extends Container {
	constructor(options) {
		options.id = 'skeleton'
		options.description = 'A broken skeleton.'
		
		super(options)
	}

	init() {
		this.addThing('humerus')

		this.afterAction('take', function(cmd) {
			if(cmd.moveThingId=='humerus') {
				if(cmd.actor.isPlayer()) {
					cmd.gameEngine.writeLine('That\'s not funny at all.')
					this.description = 'A broken, sad, skeleton. You Monster.' 
				}
			} 
		})
	}

	afterTake() {
		this.gameEngine.getCharacter('ghost').narrative('raises his head and looks interested') 
	}

	afterDrop() {
		this.gameEngine.getCharacter('ghost').narrative('looks defeated and forlorn') 
	}
}