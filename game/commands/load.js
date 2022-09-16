const fs = require('fs')
const path = require('path')
const Command = require('../../lib/Command')

module.exports = class LoadCommand extends Command {
	constructor(gameEngine, actor, filename) {
		super('load',gameEngine,actor)

		this.filename = filename
	}

	execute() {
		this.gameEngine.deserialize(JSON.parse(fs.readFileSync(this.filename)))

		this.gameEngine.writeLine('Game Loaded')
	}

	static help(gameEngine, actor) {
		if(!actor.isPlayer()) return
		gameEngine.writeLine('help: load <filename> - loads the game')
	}

	static parse(gameEngine, actor, params) {
		if(params.length>1) return module.exports.help(gameEngine, actor)

		return new module.exports(gameEngine, actor, params[0] || path.join(__dirname,'../saves','savegame.json'))
	}
}


