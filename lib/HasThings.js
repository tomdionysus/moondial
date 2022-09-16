const HasThings = {
	addThing(thingId) {
		var thing = this.gameEngine.getThing(thingId)
		this.things[thingId] = thing
		thing.location = this
		return thing
	},

	removeThing(thingId) {
		var thing = this.gameEngine.getThing(thingId)
		delete this.things[thingId]
		thing.setLocation(null)
		return thing
	},

	containsThing(thingId) {
		return thingId in this.things
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

	_hasThingsSerialize(obj) {
		obj.containsThings = Object.keys(this.things)
	},

	_hasThingsDeserialize(obj) {
		this.things = {}
		for(let x in obj.containsThings) {
			x = obj.containsThings[x]
			this.things[x] = this.gameEngine.getThing(x)
		}
	},

}

module.exports = function(obj, options) {
	for(var i in HasThings) {
		obj[i] = HasThings[i].bind(obj)
	}

	obj.things = options.things || {}

	obj._serializehooks = obj._serializehooks || []
	obj._deserializehooks = obj._deserializehooks || []
	obj._serializehooks.push(obj._hasThingsSerialize)
	obj._deserializehooks.push(obj._hasThingsDeserialize)
}