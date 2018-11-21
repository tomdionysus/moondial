module.exports = class TakeCommand {
	constructor(gameEngine, actor, thing, thingId) {
		this.gameEngine = gameEngine
		this.command = 'take'
		this.actor = actor
		this.thing = thing
		this.thingId = thingId
	}

	execute() {
		// Do we already have the thing?
		if(this.actor.containsThing(this.thingId)) {
			if (this.actor.isPlayer()) {
				this.gameEngine.writeLine('You already have '+this.thingId)
			}
			return
		}

		// Thing must exist and be in the same location as the actor
		if(!this.thing || !this.thing.location || (this.thing.location.id != this.actor.location.id)) {
			if (this.actor.isPlayer()) {
				this.gameEngine.writeLine('You can\'t see '+this.thingId)
			}
			return
		}


		// Move the thing
		this.thing.location.removeThing(this.thing.id)
		this.actor.addThing(this.thing.id)

		// Do the narrative
		if (!this.actor.isPlayer()) {
			this.actor.narrative('takes '+this.thing.id)
		} else { 
			this.actor.narrative('take '+this.thing.id)
		} 
	}

	static help(gameEngine, actor) {
		if(!actor.isPlayer()) return
		gameEngine.writeLine('help: take <thing> - take the selected thing and put it in your inventory')
	}

	static parse(gameEngine, actor, params) {
		if(params.length!=1) return module.exports.help(gameEngine, actor)

		var thing = gameEngine.get(params[0])

		return new module.exports(gameEngine, actor, thing, params[0])
	}
}