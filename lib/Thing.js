module.exports = class Thing {
	constructor(options) {
		options = options || {}

		this.id = options.id
		this.gameEngine = options.gameEngine
		this.description = options.description
		this.actions = options.actions
	}

	setDescription(description) {
		this.description = description
	}

	doAction(action, params) {
		if(!this.actions[action]) return 'Cannot '+action+' '+this.name
		this.actions[action](params)
	}
}