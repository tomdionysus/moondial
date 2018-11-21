module.exports = class ExitCommand {
	constructor(gameEngine, actor) {
		this.gameEngine = gameEngine
		this.command = 'exit'
		this.actor = actor
	}

	execute() {
		switch(this.gameEngine.getRandomInt(10)) {
		case 0:
			this.gameEngine.writeLine('Come back soon, Gallagher will miss you!')
			break
		default:
			this.gameEngine.writeLine('Shutting your eyes, you tell yourself you will wake on the count of 3.')
		}
		process.exit()
	}

	static help(gameEngine, actor) {
		if(!actor.isPlayer()) return
		gameEngine.writeLine('help: exit - exits the game')
	}

	static parse(gameEngine, actor, params) {
		if(params.length!=0) return module.exports.help()

		return new module.exports(gameEngine, actor)
	}
}


