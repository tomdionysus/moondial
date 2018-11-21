module.exports = class InventoryCommand {
	constructor(gameEngine, actor) {
		this.gameEngine = gameEngine
		this.command = 'inventory'
		this.actor = actor
		this.thing = actor
	}

	execute() {
		if(!this.actor.isPlayer()) return

		this.gameEngine.writeLine('inventory: '+this.actor.getVisibleThings().join(', '))
	}

	static help(gameEngine, actor) {
		if(!actor.isPlayer()) return
		gameEngine.writeLine('help: inventory')
	}

	static parse(gameEngine, actor, params) {
		if(params.length!=0) return module.exports.help()

		return new module.exports(gameEngine, actor)
	}
}


