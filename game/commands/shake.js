const Command = require('../../lib/Command')

module.exports = class ShakeCommand extends Command {
	constructor(gameEngine, actor, thing, thingId) {
		super('shake',gameEngine,actor)

		this.thing = thing
		this.thingId = thingId
	}

	check() {
	}

	execute() {
		if(!this.actor.isPlayer()) {
			this.actor.narrative('shakes '+this.thing.id)
		} else {
			this.actor.narrative('shake '+this.thing.id)
		}
	}

	static help(gameEngine, actor) {
		if(!actor.isPlayer()) return
		gameEngine.writeLine('help: shake <thing> - shakes the selected thing')
	}

	static parse(gameEngine, actor, params) {
		if(params.length!=1) return module.exports.help(gameEngine, actor)

		var thing = gameEngine.get(params[0])

		return new module.exports(gameEngine, actor, thing, params[0])
	}
}