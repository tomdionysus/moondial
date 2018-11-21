module.exports = class PatCommand {
	constructor(gameEngine, actor, thing, thingId) {
		this.gameEngine = gameEngine
		this.command = 'pat'
		this.actor = actor
		this.thing = thing
		this.thingId = thingId
	}

	execute() {
		if(!this.actor.isPlayer()) return

		if(!this.thing || (!this.actor.containsThing(this.thingId) && this.thing.location.id!=this.actor.location.id)) {
			this.gameEngine.writeLine('You can\'t see '+this.thingId)			
		}

		this.actor.narrative('pat '+this.thing.id)
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