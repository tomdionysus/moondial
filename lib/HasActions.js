const HasActions = {
	getActions() {
		return this.keys(this.actions)
	},

	can(cmd) {
		return !!this.actions[cmd]
	},

	do(cmd,param) {
		var i
		if(this.before[cmd] && this.before[cmd].length>0) {
			for(i in this.before[cmd]) {
				if(this.before[cmd][i].call(this,param)) return
			}
		}
		if(this.actions[cmd].call(this,param)) return
		if(this.after[cmd] && this.after[cmd].length>0) { 
			for(i in this.after[cmd]) {
				if(this.after[cmd][i].call(this,param)) return
			}
		}
	},

	addAction(name,fn) {
		this.actions[name] = fn
	},

	removeAction(name) {
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