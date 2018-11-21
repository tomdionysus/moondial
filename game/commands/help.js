const CommandRegistry = require('../../lib/CommandRegistry')
const CommandStatus = require('../../lib/CommandStatus')

module.exports = class HelpCommand {
	constructor(actor, command) {
		this.actor = actor
		this.command = command
	}

	execute(actor) {
		if(this.command) {
			var x = CommandRegistry.get(this.command)
			if(!x) return new CommandStatus(actor, 'help: No such command '+x)
			return x.help(actor)
		}

		// Generic Help.
		var actions = [].concat(this.actor.gameEngine.getActions(), this.actor.getActions(), this.actor.location.getActions())

		return new CommandStatus(this.actor, 'Actions: '+actions.join(', '))
	}

	static help(actor) {
		return new CommandStatus(actor,'help: help <entity>')
	}

	static parse(actor, params) {
		if(params.length==0) return new module.exports(actor)

		var ge = actor.gameEngine

		var obj = ge.getThing(params[0])
		if(!obj) obj = ge.getLocation(params[0])
		if(!obj) obj = ge.getCharacter(params[0])
		if(!obj) return new CommandStatus(actor, 'Cannot find '+params[0])

		return new module.exports(actor, obj)
	}
}


