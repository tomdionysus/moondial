const Command = require('../../lib/Command')

module.exports = class InventoryCommand extends Command {
	constructor(gameEngine, actor) {
		super('inventory',gameEngine,actor)
		this.thing = actor
	}

	check() {
		if(!this.actor.isPlayer()) return this.stop()
	}

	execute() {
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


