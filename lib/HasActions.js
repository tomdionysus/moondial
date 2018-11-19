module.exports = function(obj, actions) {
	obj.actions = actions || {}

	obj.getActions = function() {
		return Object.keys(this.actions)
	}.bind(obj)

	obj.can = function(cmd) {
		return !!this.actions[cmd]
	}.bind(obj)

	obj.do = function(cmd,param) {
		return this.actions[cmd](param)
	}.bind(obj)

	obj.addAction = function(name,fn) {
		this.actions[name] = fn.bind(this)
	}.bind(obj)
}