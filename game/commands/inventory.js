const CommandStatus = require('../../lib/CommandStatus') 

module.exports = class DebugCommand {
	constructor(actor) {
		this.actor = actor
	}

	execute() {
		return new CommandStatus(this.actor, 'inventory: '+this.actor.getVisibleThings().join(', '))
	}

	static help(actor) {
		return new CommandStatus(actor,'help: inventory')
	}

	static parse(actor, params) {
		if(params.length!=0) return module.exports.help()

		return new module.exports(actor)
	}
}


