const HasActions = {
	getActions() {
		return Object.keys(this.actions)
	},

	can(cmd) {
		return !!this.actions[cmd]
	},

	processBefore(c) {
		if(this.before[c.command] && this.before[c.command].length>0) {
			for(var i in this.before[c.command]) {
				if(this.before[c.command][i].call(this,c)) return true
			}
		}
		return false
	},

	processAfter(c) {
		if(this.after[c.command] && this.after[c.command].length>0) { 
			for(var i in this.after[c.command]) {
				if(this.after[c.command][i].call(this,c)) return true
			}
		}
		return false
	},

	allowAction(name) {
		this.actions[name] = true
	},

	preventAction(name) {
		delete this.actions[name]
	},

	addBefore(cmd,fn) {
		this.before[cmd] = this.before[cmd] || []
		this.before[cmd].push(fn)
	},

	addAfter(cmd,fn) {
		this.after[cmd] = this.after[cmd] || []
		this.after[cmd].push(fn)
	},
}

module.exports = function(obj, options) {
	for(var i in HasActions) {
		obj[i] = HasActions[i].bind(obj)
	}

	obj.actions = options.actions || {}
	obj.before = options.before || {}
	obj.after = options.after || {}
}