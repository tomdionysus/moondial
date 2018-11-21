const CommandStatus = require('../../lib/CommandStatus') 

module.exports = class DebugCommand {
	constructor(actor, thing) {
		this.actor = actor
		this.thing = thing
	}

	execute() {
		console.log(this.thing)
		return new CommandStatus(this.actor, '')
	}

	static help(actor) {
		return new CommandStatus(actor,'help: debug <entity>')
	}

	static parse(actor, params) {
		if(params.length==0) return module.exports.help()
		var ge = actor.gameEngine

		var obj = ge.getThing(params[0])
		if(!obj) obj = ge.getLocation(params[0])
		if(!obj) obj = ge.getCharacter(params[0])
		if(!obj) return new CommandStatus(actor,'Cannot find '+params[0])

		return new module.exports(actor, obj)
	}
}


