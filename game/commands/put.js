const ContainerFixture = require('../../lib/ContainerFixture')
const Container = require('../../lib/Container')
const Command = require('../../lib/Command')

module.exports = class PutCommand extends Command {
	constructor(gameEngine, actor, thing, thingId, moveThing, moveThingId) {
		super('put',gameEngine,actor)
		this.thing = thing
		this.thingId = thingId
		this.moveThing = moveThing
		this.moveThingId = moveThingId
	}

	check() {
		// Thing (Character) must exist, be a container and be in the same location or the inventory of the actor
		if(!this.thing || !(this.thing instanceof Container || this.thing instanceof ContainerFixture) || (!this.actor.containsThing(this.thing.id) && this.thing.location.id != this.actor.location.id)) {
			if (this.actor.isPlayer()) {
				this.gameEngine.writeLine('You can\'t see '+this.thingId)
			}
			return this.stop()
		}

		// moveThing must exist and be in the same location or be in the actors inventory
		if(!this.moveThing || (!this.actor.containsThing(this.moveThing.id) && this.moveThing.location.id != this.actor.location.id)) {
			if (this.actor.isPlayer()) {
				this.gameEngine.writeLine('You can\'t see '+this.moveThingId)
			}
			return this.stop()
		}

		// moveThing must not be a container
		if(this.moveThing instanceof Container) {
			if (this.actor.isPlayer()) {
				this.gameEngine.writeLine('You can\'t put '+this.moveThingId+' in '+this.thingId)
			}
			return this.stop()
		}
	}

	execute() {
		// Move the thing
		this.moveThing.location.removeThing(this.moveThing.id)
		this.thing.addThing(this.moveThing.id)

		// Do the narrative
		if (this.actor.isPlayer()) {
			this.actor.narrative('put '+this.moveThing.id+' in '+this.thing.id)
		} else { 
			this.actor.narrative('puts '+this.moveThing.id+' in '+this.thing.id)
		} 
	}

	static help(gameEngine, actor) {
		if(!actor.isPlayer()) return
		gameEngine.writeLine('help: put <thing> in <container> - put the selected thing in the container')
	}

	static parse(gameEngine, actor, params) {
		if(params.length!=3) return module.exports.help(gameEngine, actor)

		var moveThing = actor.gameEngine.get(params[0])
		var thing = actor.gameEngine.get(params[2])

		return new module.exports(gameEngine, actor, thing, params[2], moveThing, params[0])
	}
}