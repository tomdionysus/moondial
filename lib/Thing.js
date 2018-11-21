const HasActions = require('./HasActions')

module.exports = class Thing {
	constructor(options) {
		options = options || {}

		this.id = options.id
		this.gameEngine = options.gameEngine
		this.description = options.description
		
		HasActions(this, options)

		this.allowAction('debug')
		this.allowAction('take')
		this.allowAction('drop')
		this.allowAction('give')
		this.allowAction('examine')

		this.attributes = options.attributes || {}
	}

	setDescription(description) {
		this.description = description
	}

	setLocation(id) {
		if(id==null) { delete this.location; return }
		if(this.location) this.location.removeThing(this.id)
		this.location = this.gameEngine.getLocation(id)
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

	actionDrop(actor) {
		if (actor.location==this.gameEngine.player.location) {
			var s
			if (actor==this.gameEngine.player) { 
				s = 'You drop '+this.id+'.' 
			} else {
				s = actor.id+' drops '+this.id+'.' 
			}
			this.gameEngine.writeLine(s)
		}

		actor.removeThing(this.id)
		actor.location.addThing(this.id)
		return true
	}

	actionGive(actor, param) {
		if(param[0]!='to') return false
		var giveTo = this.gameEngine.get(param[1])
		if (actor.location==this.gameEngine.player.location) {
			var s
			if (actor==this.gameEngine.player) { 
				if(!giveTo) { this.gameEngine.writeLine('give '+this.id+' to whom?'); return true }
				if(!actor.containsThing(this.id)) { this.gameEngine.writeLine('You don\'t have '+this.id+'.'); return true }
				s = 'You give '+this.id+' to '+param[1]+'.'
			} else {
				if(!actor.containsThing(this.id)) return true
				s = actor.id+' gives '+this.id+' to '+param[1]+'.' 
			}
			this.gameEngine.writeLine(s)
			giveTo.addThing(this.id)
			actor.removeThing(this.id)
			return true
		}
	}

	actionExamine(actor) {
		if (actor.location==this.gameEngine.player.location) {
			if (actor==this.gameEngine.player) { 
				this.gameEngine.writeLine('You examine '+this.id+'.')
				this.gameEngine.writeLine(this.description)
			} else {
				this.gameEngine.writeLine(actor.id+' examines '+this.id+'.')
			}
		}
		return true
	}
}