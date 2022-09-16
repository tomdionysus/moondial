const GameObject = require('./GameObject')

module.exports = class Entity extends GameObject {
	constructor(options) {
		super(options)
		this.attributes = options.attributes || {}
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

	serialize(obj = {}) {
		super.serialize(obj)
		obj.data.description = this.description
		return obj
	}

	deserialize(obj) {
		super.deserialize(obj)
		this.description = obj.data.description
	}
}