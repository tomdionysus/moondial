const Command = require('../../lib/Command')

module.exports = class GoCommand extends Command {
	constructor(gameEngine, actor, direction, location) {
		super('go',gameEngine,actor)
		this.direction = direction
		this.location = location
	}

	check() {
		if(!this.location) {
			if(this.actor.isPlayer()) this.gameEngine.writeLine('Cannot go '+this.direction+' from here')
			return this.stop()
		}
	}

	execute() {
		var oldLocation = this.actor.location
		this.actor.setLocation(this.location)

		if(!this.actor.isPlayer()) {
			if(oldLocation==this.gameEngine.player.location) this.actor.narrative('leaves')
			if(this.location==this.gameEngine.player.location) this.actor.narrative('arrives')
		}

		this.actor.narrative('go '+this.direction)
		this.actor.doCommand('look')
	}

	static help(gameEngine, actor) {
		if(!actor.isPlayer()) return
		gameEngine.writeLine('help: go <direction> - go in the specified direction')
	}

	static parse(gameEngine, actor, params) {
		if(params.length==0 || params.length>1) return module.exports.help(gameEngine, actor)

		var direction = params.shift()
		var location = actor.location.getDirection(direction)

		return new module.exports(gameEngine, actor, direction, location)
	}
}