const CommandStatus = require('../../lib/CommandStatus') 

module.exports = class ExamineCommand {
	constructor(actor, thing) {
		this.command = 'examine'
		this.actor = actor
		this.thing = thing
	}

	execute() {
		return new CommandStatus(this.actor, this.thing.description)
	}

	static help(actor) {
		return new CommandStatus(actor,'help: examine <thing>')
	}

	static parse(actor, params) {
		if(params.length!=1) return module.exports.help(actor)

		var thing = actor.gameEngine.get(params[0])
		if(!thing || (!actor.containsThing(params[0]) && thing.location.id!=actor.location.id)) return new CommandStatus(actor,'There is no '+params[0])

		return new module.exports(actor, thing)
	}
}