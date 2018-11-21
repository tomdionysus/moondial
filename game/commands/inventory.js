module.exports = class InventoryCommand {
	constructor(gameEngine, actor) {
		this.gameEngine = gameEngine
		this.command = 'inventory'
		this.actor = actor
		this.thing = actor
	}

	execute() {
		if(!this.actor.isPlayer()) return

		this.gameEngine.writeLine('Inventory'.bold)
		this.gameEngine.writeLine((this.actor.getVisibleThings().join(', ')).italic)
	}

	static help(gameEngine, actor) {
		if(!actor.isPlayer()) return
		gameEngine.writeLine('help: inventory - list items you are carrying')
	}

	static parse(gameEngine, actor, params) {
		if(params.length!=0) return module.exports.help(gameEngine, actor)

		return new module.exports(gameEngine, actor)
	}
}


