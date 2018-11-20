const CommandStatus = require('../../lib/CommandStatus') 

module.exports = class LookCommand {
	constructor(actor, location) {
		this.actor = actor
		this.location = location
	}

	execute() {
		var str = this.location.description
		var p = this.location.getVisibleThings()
		var j = this.location.getVisibleCharacters()
		str += '\n\nYou can see: '+p.concat(j).join(', ')
		str += '\nYou can go: '+this.location.getDirections().join(', ')
		return new CommandStatus(this.actor, str)
	}

	static help(actor) {
		return new CommandStatus(actor,'help: look')
	}

	static parse(actor, params) {
		if(params.length!=0) return module.exports.help()

		return new module.exports(actor, actor.location)
	}
}