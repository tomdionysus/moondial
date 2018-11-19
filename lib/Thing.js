module.exports = class Thing {
	constructor(options) {
		options = options || {}

		this.id = options.id
		this.gameEngine = options.gameEngine
		this.description = options.description
		
		this.actions = options.actions || {}
		this.actions.take = this.actionTake.bind(this)
		this.actions.drop = this.actionDrop.bind(this)

		this.attributes = options.attributes || {}
	}

	setDescription(description) {
		this.description = description
	}

	doAction(action, params) {
		if(!this.actions[action]) return 'Cannot '+action+' '+this.name
		this.actions[action](params)
	}

	canBeTaken(b) {
		this.attributes.canBeTaken = !b
	}

	can(action) {
		return !!this.actions[action]
	}

	actionTake(params) {

	}
	
	actionDrop(params) {

	}
	
}