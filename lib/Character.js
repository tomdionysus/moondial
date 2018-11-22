const Entity = require('./Entity')
const HasActions = require('./HasActions')
const HasThings = require('./HasThings')

const CommandRegistry = require('./CommandRegistry')

module.exports = class Character extends Entity {
	constructor(options) {
		super(options)

		this.attributes = options.attributes || {}

		HasActions(this, options)
		HasThings(this, options)

		this.allowAction('debug')
		this.allowAction('describe')
		this.allowAction('go')

		this.immovable()
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
			if(this.isPlayer()) {
				this.gameEngine.writeLine('I didn\'t understand that')
			} else {
				this.narrative('didn\'t understand that')
			}
			return
		}
		cmd.check()
		if(cmd.stopped) return
		var subject = cmd.thing
		if(subject && !subject.can(cmd.command)) {
			if(this.isPlayer()) {
				this.gameEngine.writeLine('You can\'t '+cmd.command+' '+subject.id)
			} else {
				this.narrative('can\'t '+cmd.command+' '+subject.id)
			}
			return
		}
		if(subject) {
			subject.processBefore(cmd)
			if(cmd.stopped) return
		}
		cmd.execute()
		if(cmd.stopped) return
		if(subject) {
			subject.processAfter(cmd)
			if(cmd.stopped) return
		}
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