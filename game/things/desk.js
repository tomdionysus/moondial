const ContainerFixture = require('../../lib/ContainerFixture')

module.exports = class Desk extends ContainerFixture {
	constructor(options) {
		options.id = 'desk'
		options.description = 'A weathered writing desk. The desk has several drawers with rusty keyholes.'
		
		super(options)
	}

	init() {
		var locked = function(cmd) {
			if(!cmd.actor.containsThing('key')) {
				if(cmd.actor.isPlayer()) {
					cmd.gameEngine.writeLine('The desk drawers are locked.')
				}
				return cmd.stop()
			} else {
				if(cmd.actor.isPlayer()) {
					cmd.gameEngine.writeLine('You unlock the desk drawers with the key')
				}
			}
		}

		this.beforeAction('search', locked)
		this.beforeAction('take', locked)
		this.beforeAction('put', locked)
	}
}