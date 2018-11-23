const Registry = require('./Registry')

module.exports = class CommandRegistry extends Registry {
	parse(gameEngine, actor, params) {
		if(!Array.isArray(params)) params = params.split(' ')
		var cmd = params.shift()
		var _class = this.get(cmd)
		if(!_class) return null
		return _class.parse(gameEngine, actor, params)
	}
}