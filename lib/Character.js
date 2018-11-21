const Container = require('./Container')
const HasActions = require('./HasActions')
const HasThings = require('./HasThings')

const CommandRegistry = require('./CommandRegistry')

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
		this.allowAction('describe')
		this.allowAction('inventory')
		this.allowAction('go')
	}

	setDescription(description) {
		this.description = description
	}
	
	setLocation(id) {
		if(this.location) this.location.removeCharacter(this.id)
		this.location = this.gameEngine.getLocation(id)
	}

	isPlayer() {
		return this.id == this.gameEngine.player.id
	}

	say(str) {
		this.gameEngine.writeLine((this.id+':').bold+' '+str)
	}

	narrative(str) {
		this.gameEngine.writeLine(('('+this.id+' '+str+')').italic)
	}

	doCommand(str) {
		var cmd = CommandRegistry.parse(this.gameEngine, this, str)
		if(!cmd) {
			this.narrative('didn\'t understand that')
			return
		}
		var subject = cmd.thing
		if(subject && !subject.can(cmd.command)) {
			this.narrative('can\'t '+cmd.command+' '+subject.id)
			return
		}
		if(subject && subject.processBefore(cmd)) return // At least one before cancelled the action
		cmd.execute()
		if(subject && subject.processAfter(cmd)) return // At least one after cancelled the action
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