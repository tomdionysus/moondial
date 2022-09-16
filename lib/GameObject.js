module.exports = class GameObject {
	constructor(options = {}) {
		this.id = options.id
		this.gameEngine = options.gameEngine
		this._serializehooks = []
		this._deserializehooks = []
	}

	init() {
	}

	serialize(obj = {}) {
		obj.id = this.id
		obj.class = this.id
		obj.data = {}

		for(let x in this._serializehooks) this._serializehooks[x](obj)

		return obj
	}

	deserialize(obj) {
		this.id = obj.id
		
		for(let x in this._deserializehooks) this._deserializehooks[x](obj)
	}
}