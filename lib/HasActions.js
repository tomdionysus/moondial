const HasActions = {
	getActions() {
		return Object.keys(this.actions)
	},

	can(cmd) {
		return !!this.actions[cmd]
	},

	processBefore(c) {
		var stop = false, i
		if(this.before['*']) {
			for(i in this.before['*']) {
				stop = stop || this.before['*'][i].call(this,c)
			}
		}
		if(this.before[c.command]) {
			for(i in this.before[c.command]) {
				stop = stop || this.before[c.command][i].call(this,c)
			}
		}
		return stop
	},

	processAfter(c) {
		var stop = false, i
		if(this.after[c.command]) { 
			for(i in this.after[c.command]) {
				stop = stop || this.after[c.command][i].call(this,c)
			}
		}
		if(this.after['*']) { 
			for(i in this.after['*']) {
				stop = stop || this.after['*'][i].call(this,c)
			}
		}
		return stop
	},

	allowAction(name) {
		if(Array.isArray(name)) { for(let i in name) this.allowAction(name[i]); return }
		if(name!='*' && !this.gameEngine.commandRegistry.get(name)) return
		this.actions[name] = true
	},

	preventAction(name) {
		if(Array.isArray(name)) { for(let i in name) this.preventAction(name[i]); return }
		if(name!='*' && !this.gameEngine.commandRegistry.get(name)) return
		delete this.actions[name]
	},

	beforeAction(name,fn) {
		if(name!='*' && !this.gameEngine.commandRegistry.get(name)) throw 'Command not found: '+name
		this.before[name] = this.before[name] || []
		this.before[name].push(fn)
	},

	afterAction(name,fn) {
		if(name!='*' && !this.gameEngine.commandRegistry.get(name)) throw 'Command not found: '+name
		this.after[name] = this.after[name] || []
		this.after[name].push(fn)
	},

	_hasActionsSerialize(obj) {
		obj.allowedActions = this.actions
	},

	_hasActionsDeserialize(obj) {
		this.actions = obj.allowedActions
	},
}

module.exports = function(obj, options) {
	for(var i in HasActions) { obj[i] = HasActions[i].bind(obj) }

	obj.actions = options.actions || {}
	obj.before = options.before || {}
	obj.after = options.after || {}

	obj._serializehooks = obj._serializehooks || []
	obj._deserializehooks = obj._deserializehooks || []
	obj._serializehooks.push(obj._hasActionsSerialize)
	obj._deserializehooks.push(obj._hasActionsDeserialize)
}