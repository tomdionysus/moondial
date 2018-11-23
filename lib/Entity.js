const GameObject = require('./GameObject')

module.exports = class Entity extends GameObject {
	constructor(options) {
		super(options)
		this.description = options.description
	}

	init(fn) {
		if(fn) return this._init = fn
		this._init.call(this)
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