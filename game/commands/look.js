const Command = require('../../lib/Command')

module.exports = class LookCommand extends Command {
	constructor(gameEngine, actor) {
		super('look',gameEngine,actor)
	}

	check() {
		if(!this.actor.isPlayer()) return this.stop()
	}

	execute() {
		var str = this.actor.location.description
		var p = this.actor.location.getVisibleThings()
		var j = this.actor.location.getVisibleCharacters({ you: true })
		str += '\n\nYou can see: '+p.concat(j).join(', ')
		str += '\nYou can go: '+this.actor.location.getDirections().join(', ')
		this.gameEngine.writeLine(str.italic)
	}

	static help(gameEngine, actor) {
		if(!actor.isPlayer()) return
		gameEngine.writeLine('help: look')
	}

	static parse(gameEngine, actor, params) {
		if(params.length!=0) return module.exports.help(gameEngine, actor)

		return new module.exports(gameEngine, actor)
	}
}