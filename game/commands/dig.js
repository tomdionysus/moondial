const Command = require('../../lib/Command')

module.exports = class ShakeCommand extends Command {
	constructor(gameEngine, actor) {
		super('dig',gameEngine,actor)
	}

	check() {
		// Actor must have the spade
		if(!this.actor.containsThing('spade')) {
			this.actor.narrative('can\'t dig without a spade.')
			return this.stop()
		}
	}

	execute() {
		if(this.actor.beforeDig) this.actor.beforeDig(this)
		if(this.actor.location.beforeDig) this.actor.location.beforeDig(this)

		if(this.isStopped()) return

		this.actor.narrative(this.actor.isPlayer() ? 'dig':'digs')

		if(this.actor.location.afterDig) this.actor.location.afterDig(this)
		if(this.actor.afterDig) this.actor.afterDig(this)
	}

	static help(gameEngine, actor) {
		if(!actor.isPlayer()) return
		gameEngine.writeLine('help: dig <thing> - digs the selected thing')
	}

	static parse(gameEngine, actor) {
		return new module.exports(gameEngine, actor)
	}
}