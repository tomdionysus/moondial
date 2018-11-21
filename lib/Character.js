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

		this.addAction('put', this.actionPut)
	}

	setDescription(description) {
		this.description = description
	}
	
	setLocation(id) {
		if(this.location) this.location.removeCharacter(this.id)
		if(id==null) { delete this.location; return }
		this.location = this.gameEngine.getLocation(id)
	}

	doCommand(str) {
		var parsed = str.split(' ')
		// console.log("doCommand >> "+parsed)
		if(!parsed || parsed.length == 0) return false
		var cmd = parsed.shift()
		// console.log("doCommand.cmd >> "+cmd)
		if(parsed.length==0) {
			// Single word command.
			if(this.can(cmd)) return this.do(this, cmd)
			if(this.location.can(cmd)) return this.location.do(this, cmd)
			if(this.gameEngine.can(cmd)) return this.gameEngine.do(this, cmd)
		}
		// Targeted command.
		var thingId = parsed.shift()
		if(!thingId) return false

		var thing = this.gameEngine.get(thingId)
		if(!thing && !this.containsThing(thingId) && !this.location.containsThing(thingId) && !this.location.containsCharacter(thingId)) {
			if(this==this.gameEngine.player) this.gameEngine.writeLine('There is no '+thingId+'.')
			return true
		}
		if(thing.can(cmd)) {
			return thing.do(this, cmd, parsed)
		} 
		if(this==this.gameEngine.player) this.gameEngine.writeLine('You can\'t '+cmd+' '+thingId+'.')
		return true
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