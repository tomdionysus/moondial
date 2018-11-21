const HasActions = {
	getActions() {
		return Object.keys(this.actions)
	},

	can(cmd) {
		return !!this.actions[cmd]
	},

	processBefore(c) {
		var stop = false
		if(this.before[c.command]) {
			for(var i in this.before[c.command]) {
				stop = stop || this.before[c.command][i].call(this,c)
			}
		}
		return stop
	},

	processAfter(c) {
		var stop = false
		if(this.after[c.command]) { 
			for(var i in this.after[c.command]) {
				stop = stop || this.after[c.command][i].call(this,c)
			}
		}
		return stop
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