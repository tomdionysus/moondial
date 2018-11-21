module.exports = class SearchCommand {
	constructor(gameEngine, actor, thing, thingId) {
		this.gameEngine = gameEngine
		this.command = 'search'
		this.actor = actor
		this.thing = thing
		this.thingId = thingId
	}

	execute() {
		if(!this.thing || (!this.actor.containsThing(this.thing.id) && this.thing.location.id!=this.actor.location.id)) {
			this.gameEngine.narrative('can\'t see '+this.thingId)
			return
		}

		if(!this.actor.isPlayer()) {
			this.actor.narrative('searches '+this.thing.id)
			return
		} 
		this.actor.narrative('search '+this.thing.id)
		this.gameEngine.writeLine(this.thing.id+' contains: '+this.thing.getVisibleThings().join(', '))
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