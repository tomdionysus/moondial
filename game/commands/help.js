const CommandRegistry = require('../../lib/CommandRegistry')

module.exports = class HelpCommand {
	constructor(gameEngine, actor, command) {
		this.gameEngine = gameEngine
		this.command = 'help'
		this.actor = actor
		this.command = command
	}

	execute() {
		if(!this.actor.isPlayer()) return

		if(this.command) {
			var x = CommandRegistry.get(this.command)
			if(!x) {
				this.gameEngine.writeLine('help: no such command '+x)
				return
			}
			return x.help(this.gameEngine, this.actor)
		}

		// Generic Help.
		var actions = [].concat(this.gameEngine.getActions(), this.actor.getActions(), this.actor.location.getActions())
		
		this.gameEngine.writeLine('actions: '+actions.join(', '))
	}

	static help(gameEngine, actor) {
		if(!actor.isPlayer()) return
		gameEngine.writeLine('help: help [<command>] - get help on the specified command, or list all currenly available commands')
	}

	static parse(gameEngine, actor, params) {
		if(params.length==0 || params.length>1) return new module.exports(gameEngine, actor)

		var obj = gameEngine.getThing(params[0]) || gameEngine.getLocation(params[0]) ||  gameEngine.getCharacter(params[0])

		return new module.exports(gameEngine, actor, obj)
	}
}


