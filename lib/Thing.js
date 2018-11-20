const HasActions = require('./HasActions')

module.exports = class Thing {
	constructor(options) {
		options = options || {}

		this.id = options.id
		this.gameEngine = options.gameEngine
		this.description = options.description
		
		HasActions(this, options)

		this.addAction('take',this.actionTake)
		this.addAction('drop',this.actionDrop)

		this.attributes = options.attributes || {}
	}

	setDescription(description) {
		this.description = description
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
}