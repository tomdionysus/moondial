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
		var str = 'Actions'.bold+'\n'
		str += 'game: '+(this.gameEngine.getActions().join(', ')).italic+'\n'
		str += 'you: '+(this.actor.getActions().join(', ')).italic+'\n'
		str += 'location: '+(this.actor.location.getActions().join(', ')).italic+'\n'

		// Inventory
		str += 'Inventory'.bold+'\n'
		var things = this.actor.getVisibleThings()
		var st = ''
		for(var i in things) {
			var thing = this.gameEngine.getThing(things[i])
			st += thing.id+': '+(thing.getActions().join(', ')).italic+'\n'
		}
		if(st.length>0) str+=st

		// Ground
		str += 'Ground'.bold+'\n'
		things = this.actor.location.getVisibleThings()
		st = ''
		for(i in things) {
			thing = this.gameEngine.getThing(things[i])
			st += thing.id+': '+(thing.getActions().join(', ')).italic+'\n'
		}
		if(st.length>0) str+=st
		
		this.gameEngine.writeLine(str.trim())
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


