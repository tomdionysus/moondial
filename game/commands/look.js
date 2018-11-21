module.exports = class LookCommand {
	constructor(gameEngine, actor) {
		this.gameEngine = gameEngine
		this.command = 'look'
		this.actor = actor
	}

	execute() {
		if(!this.actor.isPlayer()) return

		var str = this.actor.location.description
		var p = this.actor.location.getVisibleThings()
		var j = this.actor.location.getVisibleCharacters()
		str += '\n\nYou can see: '+p.concat(j).join(', ')
		str += '\nYou can go: '+this.actor.location.getDirections().join(', ')
		this.gameEngine.writeLine(str.italic)
	}

	static help(gameEngine, actor) {
		if(!actor.isPlayer()) return
		this.gameEngine.writeLine('help: look')
	}

	static parse(gameEngine, actor, params) {
		if(params.length!=0) return module.exports.help(gameEngine, actor)

		return new module.exports(gameEngine, actor)
	}
}