module.exports = class GoCommand {
	constructor(gameEngine, actor, direction, location) {
		this.gameEngine = gameEngine
		this.command = 'go'
		this.actor = actor
		this.direction = direction
		this.location = location
	}

	execute() {
		if(!this.location) {
			if(!this.actor.isPlayer()) this.gameEngine.writeLine('Cannot go '+this.direction+' from here')
			return
		}

		var oldLocation = this.actor.location
		this.actor.setLocation(this.location)

		if(!this.actor.isPlayer()) {
			if(oldLocation==this.gameEngine.player.location) this.actor.narrative('leaves')
			return
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