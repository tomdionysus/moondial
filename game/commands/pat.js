const Command = require('../../lib/Command')

module.exports = class PatCommand extends Command {
	constructor(gameEngine, actor, thing, thingId) {
		super('pat',gameEngine,actor)
		this.thing = thing
		this.thingId = thingId
	}

	check() {
		// Thing must exist, and have a location, and be either in the actors inventory or in the actors location
		if(!this.thing || !this.thing.location || (!this.actor.containsThing(this.thingId) && this.thing.location.id!=this.actor.location.id)) {
			if (this.actor.isPlayer()) {
				this.actor.narrative(' can\'t see '+this.thingId)
			}
			return this.stop()
		}
	}

	execute() {
		if (this.actor.isPlayer()) {
			this.actor.narrative('pat '+this.thing.id)
		} else {
			this.actor.narrative('pats '+this.thing.id)
		}
	}

	static help(gameEngine, actor) {
		if(!actor.isPlayer()) return
		gameEngine.writeLine('help: pat <thing> - pats the selected thing')
	}

	static parse(gameEngine, actor, params) {
		if(params.length!=1) return module.exports.help(gameEngine, actor)

		var thing = gameEngine.get(params[0])

		return new module.exports(gameEngine, actor, thing, params[0])
	}
}