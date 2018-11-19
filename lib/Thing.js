const HasActions = require('./HasActions')

module.exports = class Thing {
	constructor(options) {
		options = options || {}

		this.id = options.id
		this.gameEngine = options.gameEngine
		this.description = options.description
		
		HasActions(this, options.actions)
		this.addAction('take',this.actionTake)
		this.addAction('drop',this.actionDrop)

		this.attributes = options.attributes || {}
	}

	setDescription(description) {
		this.description = description
	}

	doAction(action, params) {
		if(!this.actions[action]) return 'Cannot '+action+' '+this.name
		this.actions[action](params)
	}

	can(action) {
		return !!this.actions[action]
	}

	isVisible() {
		return !this.attributes.hidden
	}

	hide() {
		this.attributes.hidden = true
	}

	show() {
		this.attributes.hidden = false
	}

	actionTake() {
		this.gameEngine.writeLine('You take '+this.id+'.')
		this.location.removeThing(this.id)
		return this.gameEngine.player.addThing(this.id)
	}

	actionDrop() {
		this.gameEngine.writeLine('You drop '+this.id+'.')
		this.gameEngine.player.location.addThing(this.id)
		return this.removeThing(this.id)
	}
}