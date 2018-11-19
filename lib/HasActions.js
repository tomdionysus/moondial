module.exports = function(obj, actions) {
	obj.actions = actions || {}
	obj.before = actions || {}
	obj.after = actions || {}

	obj.getActions = function() {
		return Object.keys(this.actions)
	}.bind(obj)

	obj.can = function(cmd) {
		return !!this.actions[cmd]
	}.bind(obj)

	obj.do = function(cmd,param) {
		var i
		if(this.before[cmd] && this.before[cmd].length>0) {
			for(i in this.before[cmd]) {
				if(this.before[cmd][i](param)) return
			}
		}
		if(this.actions[cmd](param)) return
		if(this.after[cmd] && this.after[cmd].length>0) { 
			for(i in this.before[cmd]) {
				if(this.after[cmd][i](param)) return
			}
		}
	}.bind(obj)

	obj.addAction = function(name,fn) {
		this.actions[name] = fn.bind(this)
	}.bind(obj)

	obj.removeAction = function(name) {
		delete this.actions[name]
	}.bind(obj)

	obj.addBefore = function(cmd,fn) {
		this.before[cmd] = this.before[cmd] || []
		this.before[cmd].push(fn.bind(this))
	}.bind(obj)

	obj.addAfter = function(cmd,fn) {
		this.after[cmd] = this.after[cmd] || []
		this.after[cmd].push(fn.bind(this))
	}.bind(obj)
}