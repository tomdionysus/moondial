const fs = require('fs')
const path = require('path')
const moment = require('moment')
const Command = require('../../lib/Command')

module.exports = class SaveCommand extends Command {
	constructor(gameEngine, actor, filename) {
		super('save', gameEngine, actor)
		this.filename = filename
	}

	execute() {
		fs.writeFileSync(this.filename,JSON.stringify(this.gameEngine.serialize()))

		this.gameEngine.writeLine('Game Saved')
	}

	static help(gameEngine, actor) {
		if(!actor.isPlayer()) return
		gameEngine.writeLine('help: save - saves the game')
	}

	static parse(gameEngine, actor, params) {
		if(params.length!=0) return module.exports.help()

		var filename = params[0] || path.join(__dirname,'../../saves','Moondial-'+moment().format('yyyy-mm-DD-HH-MM-ss')+'.json')

		return new module.exports(gameEngine, actor, filename)
	}
}


