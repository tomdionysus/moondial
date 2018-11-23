module.exports = class GameObject {
	constructor(options) {
		options = options || {}
		this.id = options.id
		this.gameEngine = options.gameEngine
	}

	init(fn) {
		if(fn) return this._init = fn
		this._init.call(this)
	}

	_init() {
		
	}
}