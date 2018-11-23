const fs = require('fs')
const path = require('path')

module.exports = class Registry {
	constructor(options) {
		this.options = options || {}
		this.registry = {}
	}

	register(name, _class) {
		this.registry[name] = _class
	}

	get(name) {
		return this.registry[name]
	}

	load(base) {
		var files = fs.readdirSync(base)
		for(var i in files) {
			var file = files[i]
			var fileBase = path.basename(file,'.js')
			var fullPath = path.join(base, file)
			var stats = fs.statSync(fullPath)
			if (stats.isDirectory()) continue
			if (path.extname(file)!='.js') continue

			var t = require(fullPath)
			if(t) this.register(fileBase, t)
		}
	}

	instantiateAll(options) {
		var out = {}
		for(var i in this.registry) {
			out[i] = new this.registry[i](options)
		}
		return out
	}
}