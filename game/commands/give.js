module.exports = class GiveCommand {
	constructor(gameEngine, actor, thing, thingId, giftThing, giftThingId) {
		this.gameEngine = gameEngine
		this.command = 'give'
		this.actor = actor
		this.thing = thing
		this.thingId = thingId
		this.giftThing = giftThing
		this.giftThingId = giftThingId
	}

	execute() {
		// Thing (Character) must exist and be in the same location as the actor
		if(!this.thing || (this.thing.location.id != this.actor.location.id)) {
			if (this.actor.isPlayer()) {
				this.gameEngine.writeLine('You can\'t see '+this.thingId)
			}
			return
		}

		// giftThing must exist and be in the same location or be in the characters inventory
		if(!this.giftThing || (!this.actor.containsThing(this.giftThing.id) && this.giftThing.location.id != this.actor.location.id)) {
			if (this.actor.isPlayer()) {
				this.gameEngine.writeLine('You can\'t see '+this.giftThingId)
			}
			return
		}

		// Move the thing
		this.giftThing.location.removeThing(this.giftThing.id)
		this.thing.addThing(this.giftThing.id)

		// Do the narrative
		if (this.actor.isPlayer()) {
			this.actor.narrative('give '+this.giftThing.id+' to '+this.thing.id)
		} else { 
			this.actor.narrative('gives '+this.giftThing.id+' to '+this.thing.id)
		} 
	}

	static help(gameEngine, actor) {
		if(!actor.isPlayer()) return
		gameEngine.writeLine('help: give <thing> to <character> - give the selected thing to the character')
	}

	static parse(gameEngine, actor, params) {
		if(params.length!=3) return module.exports.help(gameEngine, actor)

		var thingGiven = actor.gameEngine.get(params[0])
		var thing = actor.gameEngine.get(params[2])

		return new module.exports(gameEngine, actor, thing, params[2], thingGiven, params[0])
	}
}