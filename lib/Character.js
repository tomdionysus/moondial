const Container = require('./Container')
const HasActions = require('./HasActions')
const HasThings = require('./HasThings')

module.exports = class Character {
	constructor(options) {
		options = options || {}

		this.id = options.id
		this.gameEngine = options.gameEngine
		this.description = options.description

		this.attributes = options.attributes || {}

		HasActions(this, options)
		HasThings(this, options)

		this.allowAction('debug')
		this.allowAction('examine')
		this.allowAction('inventory')
		this.allowAction('go')
	}

	setDescription(description) {
		this.description = description
	}
	
	setLocation(id) {
		if(this.location) this.location.removeCharacter(this.id)
		if(id==null) { delete this.location; return }
		this.location = this.gameEngine.getLocation(id)
	}

	isPlayer() {
		return this.id == this.gameEngine.player
	}

	say(str) {
		this.gameEngine.writeLine(this.id+': "'+str+'"')
	}

	narrative(str) {
		this.gameEngine.writeLine(this.id+' '+str)
	}

	actionPut(actor, parsed) {
		var thingId = parsed.shift()
		if(!thingId) return this.gameEngine.writeLine('Put what?')
		var inCmd = parsed.shift()
		if(!inCmd || inCmd!='in') return this.gameEngine.writeLine('Put '+thingId+' in what?')
		var inThingId = parsed.shift()
		if(!inThingId) return this.gameEngine.writeLine('Put '+thingId+' in what?')

		if(!this.containsThing(thingId) && !this.location.containsThing(thingId)) return this.gameEngine.writeLine('You don\'t have '+thingId+'.')
		if(!this.containsThing(inThingId) && !this.location.containsThing(inThingId)) return this.gameEngine.writeLine('You don\'t have '+inThingId+'.')

		var thing = this.gameEngine.getThing(thingId)
		var inThing = this.gameEngine.getThing(inThingId)

		if(!(inThing instanceof Container)) return this.gameEngine.writeLine('You can\t put '+thingId+' into '+inThingId+'.')

		this.gameEngine.writeLine('You put '+thing.id+' in '+inThing.id+'.')
		thing.location.removeThing(thingId)
		inThing.addThing(thingId)
	}

	actionSearch(actor, parsed) {
		var inThingId = parsed.shift()
		if(!inThingId) return this.gameEngine.writeLine('Search what?')

		if(!this.containsThing(inThingId) && !this.location.containsThing(inThingId)) return this.gameEngine.writeLine('You don\'t have '+inThingId+'.')

		var inThing = this.gameEngine.getThing(inThingId)

		if(!inThing.can('search')) return this.gameEngine.writeLine('You can\'t search '+inThingId+'.')
		inThing.do('search')
	}

	isVisible() {
		return !this.attributes.hidden
	}

	hide() {
		this.attributes.hidden = true
	}

	show() {
		this.attributes.hidden = false
	}
}