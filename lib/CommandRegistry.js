const fs = require('fs')
const path = require('path')

const commandRegistry = {}

module.exports = class CommandRegistry {
	static parse(gameEngine, actor, params) {
		if(!Array.isArray(params)) params = params.split(' ')
		var cmd = params.shift()
		if(!commandRegistry[cmd]) return null
		return commandRegistry[cmd].parse(gameEngine, actor, params)
	}

	static register(name, commandClass) {
		commandRegistry[name] = commandClass
	}

	static get(name) {
		return commandRegistry[name]
	}

	static load(base) {
		var files = fs.readdirSync(base)
		for(var i in files) {
			var file = files[i]
			var fileBase = path.basename(file,'.js')
			var fullPath = path.join(base, file)
			var stats = fs.statSync(fullPath)
			if (stats.isDirectory()) continue
			if (path.extname(file)!='.js') continue

			var t = require(fullPath)
			if(t) CommandRegistry.register(fileBase, t)
		}
	}
}