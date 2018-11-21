module.exports = class TakeCommand {
	constructor(gameEngine, actor, thing, thingId) {
		this.gameEngine = gameEngine
		this.command = 'take'
		this.actor = actor
		this.thing = thing
		this.thingId = thingId
	}

	execute() {
		// Thing must be in the actors invetory
		if(!this.thing || (!this.actor.containsThing(this.thing.id))) {
			this.actor.narrative('don\'t have '+this.thingId)
			return
		}

		// Move the thing
		if(this.thing.location) this.thing.location.removeThing(this.thing.id)
		this.actor.location.addThing(this.thing.id)

		// Do the narrative
		if(this.actor.isPlayer()) {
			this.actor.narrative('drop '+this.thing.id)
		} else {
			this.actor.narrative('drops '+this.thing.id)
		}
	}

	static help(gameEngine, actor) {
		if(!actor.isPlayer()) return
		gameEngine.writeLine('help: drop <thing> - drop the selected thing')
	}

	static parse(gameEngine, actor, params) {
		if(params.length!=1) return module.exports.help(gameEngine, actor)

		var thing = gameEngine.get(params[0])

		return new module.exports(gameEngine, actor, thing, params[0])
	}
}