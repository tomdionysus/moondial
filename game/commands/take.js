const Container = require('../../lib/Container')

module.exports = class TakeCommand {
	constructor(gameEngine, actor, thing, thingId, moveThing, moveThingId) {
		this.gameEngine = gameEngine
		this.command = 'take'
		this.actor = actor
		this.thing = thing
		this.thingId = thingId
		this.moveThing = moveThing
		this.moveThingId = moveThingId
	}

	execute() {
		// Do we already have the thing?
		if(this.actor.containsThing(this.moveThingId)) {
			if (this.actor.isPlayer()) {
				this.gameEngine.writeLine('You already have '+this.moveThingId)
			}
			return
		}

		// If there's no container then the source is the actor location
		var fromContainer = !!this.thing
		if(!this.thing) { this.thing = this.actor.location }

		// Thing must exist
		if(!this.thing) {
			if (this.actor.isPlayer()) {
				this.gameEngine.writeLine('You can\'t see '+this.thingId)
			}
			return
		}

		// If from a container...
		if(fromContainer) {
			// Source must actually be a container
			if(!(this.thing instanceof Container)) {
				if (this.actor.isPlayer()) {
					this.gameEngine.writeLine('You can\'t take things from '+this.thingId)
				}
				return		
			}
			// Source must be in the same location or the inventory of the actor
			if(!this.actor.containsThing(this.thing.id) && this.thing.location.id != this.actor.location.id) {
				if (this.actor.isPlayer()) {
					this.gameEngine.writeLine('You can\'t see '+this.thingId)
				}
				return
			}
		}

		// moveThing must exist and be in the source
		if(!this.moveThing || (!this.thing.containsThing(this.moveThing.id))) {
			if (this.actor.isPlayer()) {
				this.gameEngine.writeLine(this.thing.id+' doesn\'t contain '+this.moveThingId)
			}
			return
		}

		// Move the thing
		this.moveThing.location.removeThing(this.moveThing.id)
		this.actor.addThing(this.moveThing.id)

		// Do the narrative
		var fromStr = fromContainer ? ' from '+this.thing.id : ''
		if (this.actor.isPlayer()) {
			this.actor.narrative('take '+this.moveThing.id+fromStr)
		} else {
			this.actor.narrative('takes '+this.moveThing.id+fromStr)
		} 
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