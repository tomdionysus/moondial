module.exports = class DebugCommand {
	constructor(gameEngine, actor, thing) {
		this.gameEngine = gameEngine
		this.command = 'debug'
		this.actor = actor
		this.thing = thing
	}

	execute() {
		if(!this.actor.isPlayer()) return
		console.log(this.thing)
	}

	static help(gameEngine, actor) {
		if(!actor.isPlayer()) return
		gameEngine.writeLine('help: debug <entity> - debug dumps the object to the terminal')
	}

	static parse(gameEngine, actor, params) {
		if(params.length==0) return module.exports.help()
		var ge = actor.gameEngine

		var obj = ge.getThing(params[0])
		if(!obj) obj = ge.getLocation(params[0])
		if(!obj) obj = ge.getCharacter(params[0])
		if(!obj) return new CommandStatus(actor,'Cannot find '+params[0])

		return new module.exports(gameEngine, actor, obj)
	}
}


