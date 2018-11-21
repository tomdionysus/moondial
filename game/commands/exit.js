const CommandStatus = require('../../lib/CommandStatus') 

module.exports = class ExitCommand {
	constructor(actor) {
		this.command = 'exit'
		this.actor = actor
	}

	execute() {
		this.actor.gameEngine.writeLine('Shutting your eyes, you tell yourself you will wake on the count of 3.')
		process.exit()
	}

	static help(actor) {
		return new CommandStatus(actor,'help: exit')
	}

	static parse(actor, params) {
		if(params.length!=0) return module.exports.help()

		return new module.exports(actor)
	}
}


