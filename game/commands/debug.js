const Command = require('../../lib/Command')

module.exports = class DebugCommand extends Command {
	constructor(gameEngine, actor, thing, thingId) {
		super('debug',gameEngine,actor)
		this.thing = thing
		this.thingId = thingId
	}

	check() {
		// Debug only works for player
		if(!this.actor.isPlayer()) return this.stop()
	}

	execute() {
		console.log(this.thing)
	}

	static help(gameEngine, actor) {
		if(!actor.isPlayer()) return
		gameEngine.writeLine('help: debug <entity> - debug dumps the object to the terminal')
	}

	static parse(gameEngine, actor, params) {
		if(params.length==0) return module.exports.help(gameEngine, actor)

		var obj = gameEngine.get(params[0])
		if(!obj) return module.exports.help(gameEngine, actor)

		return new module.exports(gameEngine, actor, obj)
	}
}


