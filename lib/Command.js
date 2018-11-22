module.exports = class Command {
	constructor(command, gameEngine, actor) {
		this.command = command
		this.gameEngine = gameEngine
		this.actor = actor
		this.stopped = false
	}

	check() {

	}

	execute() {

	}

	stop() {
		this.stopped = true
	}
}