const Command = require('../../lib/Command')

module.exports = class SearchCommand extends Command {
	constructor(gameEngine, actor, thing, thingId) {
		super('search',gameEngine,actor)

		this.thing = thing
		this.thingId = thingId
	}

	check() {
		if(!this.thing || (!this.actor.containsThing(this.thing.id) && this.thing.location.id!=this.actor.location.id)) {
			if(!this.actor.isPlayer()) {
				this.gameEngine.writeLine('You can\'t see '+this.thing.id)
			} else {
				this.actor.narrative('can\'t see '+this.thingId)
			}
			return this.stop()
		}
	}

	execute() {
		if(!this.actor.isPlayer()) {
			this.actor.narrative('searches '+this.thing.id)
			return
		} 
		this.gameEngine.writeLine('You search '+this.thing.id)
		this.gameEngine.writeLine(this.thing.id+' contains: '+this.thing.getThings().join(', '))
	}

	static help(gameEngine, actor) {
		if(!actor.isPlayer()) return
		gameEngine.writeLine('help: search <container> - list the contents of a container')
	}

	static parse(gameEngine, actor, params) {
		if(params.length != 1) return module.exports.help(gameEngine, actor)

		var thing = gameEngine.get(params[0])

		return new module.exports(gameEngine, actor, thing, params[0])
	}
}