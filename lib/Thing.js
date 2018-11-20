const HasActions = require('./HasActions')

module.exports = class Thing {
	constructor(options) {
		options = options || {}

		this.id = options.id
		this.gameEngine = options.gameEngine
		this.description = options.description
		
		HasActions(this, options)

		this.attributes = options.attributes || {}
	}

	setDescription(description) {
		this.description = description
	}

	setLocation(id) {
		if(id==null) { delete this.location; return }
		if(this.location) this.location.removeThing(this.id)
		this.location = this.gameEngine.getLocation(id)
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