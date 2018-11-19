module.exports = function(obj, things) {
	obj.things = things || {} 

	obj.addThing = function(thingId) {
		var thing = this.gameEngine.getThing(thingId)
		this.things[thingId] = thing
		thing.location = this
	}.bind(obj)

	obj.removeThing = function(thingId) {
		var thing = this.gameEngine.getThing(thingId)
		delete this.things[thingId]
		delete thing.location
	}.bind(obj)

	obj.contains = function(thingId) {
		return !!this.things[thingId]
	}.bind(obj)

	obj.getVisibleThings = function() {
		var out = []
		for(var i in this.things) { 
			if(this.things[i].isVisible()) out.push(i)
		}
		return out
	}
}