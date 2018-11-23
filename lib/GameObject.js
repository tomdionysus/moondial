module.exports = class GameObject {
	constructor(options) {
		options = options || {}
		this.id = options.id
		this.gameEngine = options.gameEngine
	}

	init() {
	}
}