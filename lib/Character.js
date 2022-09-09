const Entity = require('./Entity')
const HasActions = require('./HasActions')
const HasThings = require('./HasThings')

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
		if(!id) return this.location = null
		if(this.location && this.location.id == id) return
		if(this.location) this.location.removeCharacter(this.id)
		this.location = this.gameEngine.getLocation(id)
		this.location.addCharacter(this.id)
	}

	isPlayer() {
		return this.id == this.gameEngine.player.id
	}

	isInPlayerLocation() {
		return this.gameEngine.player.location.id == this.location.id
	}

	say(str) {
		this.gameEngine.writeLine((this.id+':').bold+' '+str)
	}

	narrative(str) {
		this.gameEngine.writeLine(('('+this.id+' '+str+')').italic)
	}

	doCommand(str) {
		var cmd = this.gameEngine.commandRegistry.parse(this.gameEngine, this, str)
		if(!cmd) {
			if(this.isPlayer()) {
				this.gameEngine.writeLine('I didn\'t understand that')
			} else {
				this.narrative('didn\'t understand that')
			}
			return
		}
		if(!this.can(cmd.command)) {
			this.narrative('can\'t '+cmd.command)
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