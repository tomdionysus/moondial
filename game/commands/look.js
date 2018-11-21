const CommandStatus = require('../../lib/CommandStatus') 

module.exports = class LookCommand {
	constructor(actor) {
		this.command = 'look'
		this.actor = actor
	}

	execute() {
		var str = this.actor.location.description
		var p = this.actor.location.getVisibleThings()
		var j = this.actor.location.getVisibleCharacters()
		str += '\n\nYou can see: '+p.concat(j).join(', ')
		str += '\nYou can go: '+this.actor.location.getDirections().join(', ')
		return new CommandStatus(this.actor, str)
	}

	static help(actor) {
		return new CommandStatus(actor,'help: look')
	}

	static parse(actor, params) {
		if(params.length!=0) return module.exports.help(actor)

		return new module.exports(actor)
	}
}