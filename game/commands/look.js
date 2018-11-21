const CommandStatus = require('../../lib/CommandStatus') 

module.exports = class LookCommand {
	constructor(actor, thing) {
		this.command = 'look'
		this.actor = actor
		this.thing = thing
	}

	execute() {
		var str = this.thing.description
		var p = this.thing.getVisibleThings()
		var j = this.thing.getVisibleCharacters()
		str += '\n\nYou can see: '+p.concat(j).join(', ')
		str += '\nYou can go: '+this.actor.location.getDirections().join(', ')
		return new CommandStatus(this.actor, str)
	}

	static help(actor) {
		return new CommandStatus(actor,'help: look')
	}

	static parse(actor, params) {
		if(params.length!=0) return module.exports.help(actor)

		return new module.exports(actor, actor.location)
	}
}