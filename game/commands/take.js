const CommandStatus = require('../../lib/CommandStatus') 

module.exports = class TakeCommand {
	constructor(actor, thing) {
		this.command = 'take'
		this.actor = actor
		this.thing = thing
	}

	execute() {
		this.thing.location.removeThing(this.thing.id)
		this.actor.addThing(this.thing.id)
		var s
		if (this.actor.isPlayer()) { 
			s = 'You take '+this.thing.id+'.' 
		} else {
			s = this.actor.id+' takes '+this.thing.id+'.' 
		}
		return new CommandStatus(this.actor, s)
	}

	static help(actor) {
		return new CommandStatus(actor,'help: take <thing>')
	}

	static parse(actor, params) {
		if(params.length!=1) return module.exports.help(actor)

		var thing = actor.gameEngine.get(params[0])
		if(!thing || (thing.location.id != actor.location.id)) return new CommandStatus(actor,'There is no '+params[0])

		return new module.exports(actor, thing)
	}
}