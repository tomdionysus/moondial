const HasActions = require('./HasActions')
const Entity = require('./Entity')

module.exports = class Thing extends Entity {
	constructor(options) {
		super(options)

		HasActions(this, options)

		this.allowAction('debug')
		this.allowAction('take')
		this.allowAction('drop')
		this.allowAction('give')
		this.allowAction('describe')

		this.attributes = options.attributes || {
			hidden: false,
			immovable: false,
		}
	}

	setDescription(description) {
		this.description = description
	}

	setLocation(id) {
		if(id==null) { delete this.location; return }
		if(this.location.id == id) return
		if(this.location) this.location.removeThing(this.id)
		this.location = this.gameEngine.getLocation(id)
		this.location.addThing(this.id)
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