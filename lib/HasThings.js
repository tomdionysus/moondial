const HasThings = {
	addThing(thingId) {
		var thing = this.gameEngine.getThing(thingId)
		this.things[thingId] = thing
		thing.location = this
	},

	removeThing(thingId) {
		var thing = this.gameEngine.getThing(thingId)
		delete this.things[thingId]
		thing.location = null
	},

	contains(thingId) {
		return !!this.things[thingId]
	},

	getThings() {
		return Object.keys(this.things)
	},

	getVisibleThings() {
		var out = []
		for(var i in this.things) { 
			if(this.things[i].isVisible()) out.push(i)
		}
		return out
	},
}

module.exports = function(obj, options) {
	for(var i in HasThings) {
		obj[i] = HasThings[i]
	}

	obj.things = options.things || {}
}