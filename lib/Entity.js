module.exports = class Entity {
	constructor(options) {
		options = options || {}
		this.id = options.id
		this.gameEngine = options.gameEngine
		this.description = options.description
	}

	movable() {
		this.attributes.immovable = false
	}

	immovable() {
		this.attributes.immovable = true
	}

	isImmovable() {
		return !!this.attributes.immovable
	}

	setDescription(description) {
		this.description = description
	}

	description() {
		return this.description
	}
}