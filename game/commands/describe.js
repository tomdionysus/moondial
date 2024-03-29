const Command = require('../../lib/Command')

module.exports = class DescribeCommand extends Command {
	constructor(gameEngine, actor, thing, thingId) {
		super('describe',gameEngine,actor)
		this.thing = thing
		this.thingId = thingId
	}

	check() {
		if(!this.actor.isPlayer()) return this.stop()
		if(!this.thing || (!this.actor.containsThing(this.thing.id) && this.thing.location.id!=this.actor.location.id)) {
			this.actor.narrative('can\'t see '+this.thingId)
			return this.stop()
		}
	}

	execute() {
		this.gameEngine.writeLine(this.thing.description.italic)
	}

	static help(gameEngine, actor) {
		if(!actor.isPlayer()) return
		gameEngine.writeLine('help: describe <thing> - describes the thing')
	}

	static parse(gameEngine, actor, params) {
		if(params.length!=1) return module.exports.help(gameEngine, actor)

		var thing = actor.gameEngine.get(params[0])

		return new module.exports(gameEngine, actor, thing, params[0])
	}
}