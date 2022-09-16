const Command = require('../../lib/Command')

module.exports = class TeleportCommand extends Command {
	constructor(gameEngine, actor, location) {
		super('teleport', gameEngine, actor)
		this.location = location
	}

	check() {
		if(!this.location) {
			this.actor.narrative('can\'t teleport to there.')
			this.stop()
		}
	}

	execute() {
		if(!this.actor.isPlayer()) {
			if(this.actor.location.id==this.gameEngine.player.location.id) this.actor.narrative('disappears')
		}

		this.actor.setLocation(this.location.id)

		if(!this.actor.isPlayer()) {
			if(this.actor.isInPlayerLocation()) this.actor.narrative('appears')
		} else {
			this.actor.narrative('teleport to '+this.location.id)
			this.actor.doCommand('look')
		}
	}

	static help(gameEngine, actor) {
		if(!actor.isPlayer()) return
		gameEngine.writeLine('help: teleport to <location> - teleport to the specified location')
	}

	static parse(gameEngine, actor, params) {
		if(params.length==0 || params.length>1) return module.exports.help(gameEngine, actor)

		var location = gameEngine.getLocation(params.shift())

		return new module.exports(gameEngine, actor, location)
	}
}