const Container = require('../../lib/Container')
const Command = require('../../lib/Command')

module.exports = class TakeCommand extends Command {
	constructor(gameEngine, actor, thing, thingId, moveThing, moveThingId) {
		super('take',gameEngine,actor)

		this.thing = thing
		this.thingId = thingId
		this.moveThing = moveThing
		this.moveThingId = moveThingId
	}

	check() {
		// Do we already have the thing?
		if(this.actor.containsThing(this.moveThingId)) {
			if (this.actor.isPlayer()) {
				this.gameEngine.writeLine('You already have '+this.moveThingId)
			}
			return this.stop()
		}

		// If there's no container then the source is the actor location
		this.fromContainer = !!this.thing
		if(!this.thing) { 
			this.thing = this.actor.location 
			this.thingId = this.actor.location.id
		}

		// this.gameEngine.writeLine("take thing > "+this.thingId+", movething > "+this.moveThingId+", fromContainer > "+ this.fromContainer)

		// Thing must exist
		if(!this.thing) {
			if (this.actor.isPlayer()) {
				this.gameEngine.writeLine('You can\'t see '+this.thingId)
			}
			return this.stop()
		}

		// moveThing must exist
		if(!this.moveThing) {
			if (this.actor.isPlayer()) {
				if(this.fromContainer) {
					this.gameEngine.writeLine('You can\'t see '+this.moveThingId+' in '+this.thingId)
				} else {
					this.gameEngine.writeLine('You can\'t see '+this.moveThingId)
				}
			}
			return this.stop()
		}

		if(this.fromContainer) {
			// If from a container...

			// Source must actually be a container
			if(!(this.thing instanceof Container)) {
				if (this.actor.isPlayer()) {
					this.gameEngine.writeLine('You can\'t take things from '+this.thingId)
				}
				return this.stop()	
			}
			// Source must be in the same location or the inventory of the actor
			if(!this.actor.containsThing(this.thing.id) && this.thing.location.id != this.actor.location.id) {
				if (this.actor.isPlayer()) {
					this.gameEngine.writeLine('You can\'t see '+this.thingId)
				}
				return this.stop()
			}
	
			// moveThing must be in the source
			if(!this.thing.containsThing(this.moveThing.id)) {
				if (this.actor.isPlayer()) {
					this.gameEngine.writeLine(this.thing.id+' doesn\'t contain '+this.moveThingId)
				}
				return this.stop()
			}
		} else {
			// If from a location

			// moveThing must not be fixed
			if(this.moveThing.isImmovable()) {
				if (this.actor.isPlayer()) {
					this.gameEngine.writeLine('You can\'t take '+this.moveThingId)
				}
				return this.stop()
			}

			// Thing must be in the same location as the actor
			if(this.moveThing.location.id != this.actor.location.id) {
				if (this.actor.isPlayer()) {
					this.gameEngine.writeLine('You can\'t see '+this.moveThingId)
				}
				return this.stop()
			}
		}

	}

	execute() {
		if(this.moveThing.beforeTake) { this.moveThing.beforeTake(this) }
		if(this.actor.beforeTake) { this.actor.beforeTake(this) }
		if(this.isStopped()) return

		// Move the thing
		this.moveThing.location.removeThing(this.moveThing.id)
		this.actor.addThing(this.moveThing.id)

		// Do the narrative
		var fromStr = this.fromContainer ? ' from '+this.thing.id : ''
		if (this.actor.isPlayer()) {
			this.actor.narrative('take '+this.moveThing.id+fromStr)
		} else {
			this.actor.narrative('takes '+this.moveThing.id+fromStr)
		} 

		if(this.actor.afterTake) { this.actor.afterTake(this) }
		if(this.moveThing.afterTake) { this.moveThing.afterTake(this) }
	}

	static help(gameEngine, actor) {
		if(!actor.isPlayer()) return
		gameEngine.writeLine('help: take <thing> [from <container>] - take the selected thing and put it in your inventory')
	}

	static parse(gameEngine, actor, params) {
		var thing, thingId, moveThing, moveThingId
		switch(params.length) {
		case 1:
			moveThingId = params[0]
			moveThing = actor.gameEngine.get(moveThingId)
			break
		case 3:
			if(params[1]!='from') return module.exports.help(gameEngine, actor)
			moveThingId = params[0]
			moveThing = actor.gameEngine.get(moveThingId)
			thingId = params[2]
			thing = actor.gameEngine.get(thingId)
			break
		default:
			return module.exports.help(gameEngine, actor)
		}	

		return new module.exports(gameEngine, actor, thing, params[2], moveThing, params[0])
	}
}