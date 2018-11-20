const CommandStatus = require('../../lib/CommandStatus') 

module.exports = class GoCommand {
	constructor(actor, direction, location) {
		this.actor = actor
		this.direction = direction
		this.location = location
	}

	execute() {
		this.actor.setLocation(this.location)
		return new CommandStatus(this.actor, 'You go '+this.direction)
	}

	static help(actor) {
		return new CommandStatus(actor,'help: go <direction>')
	}

	static parse(actor, params) {
		if(params.length==0 || params.length>1) return module.exports.help()

		var direction = params.shift()
		var location = actor.location.getDirection(direction)
		if(!location) return new CommandStatus(actor,'Cannot go '+direction+' from here')

		return new module.exports(actor, direction, location)
	}
}