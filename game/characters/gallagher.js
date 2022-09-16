const Character = require('../../lib/Character')

module.exports = class Gallagher extends Character {
	constructor(options) {
		options.id = 'gallagher'
		options.description = 'Gallagher is a large ginger cat. He\'s a bit shy.'
		
		super(options)
	}

	init() {
		setInterval(function(){
			if (this.isInPlayerLocation()) {
				switch(this.gameEngine.getRandomInt(10)) {
				case 0:
					return this.say('bbrrrt!') 
				case 1:
					return this.say('meowww...') 
				case 2:
					return this.narrative('rolls around on the ground')
				}
			}
		}.bind(this), 10000)

		this.allowAction('pat')
		this.allowAction('give')
		this.allowAction('drop')

		this.addThing('key')

		// Gallagher only wants the fish.
		this.beforeAction('give', function(command) {
			if(command.giftThingId!='fish') {
				this.narrative('doesn\'t want '+command.giftThingId)
				return command.stop()
			}
			return
		})

		// Gallagher loves fish.
		this.afterAction('give', function(command) {
			if(command.giftThingId!='fish') return
			this.narrative('is really loving his fish')
			this.say('...purrr!')
			this.setDescription('Gallagher is a large, friendly ginger cat. He\'s a bit shy. He\'s carrying a small fish and looking very pleased with himself.')
		})

		this.beforeAction('pat', function(command) {
			if(!command.actor.isPlayer()) return command.stop()
			// Gallagher will let you pat him if he has the fish
			if(this.containsThing('fish')) return
			// 
			this.narrative('runs away when you try to pat him. He sits down again further away and regards you distainfully')
			this.say('...brrtt...')
			command.stop()
			return 
		})

		this.afterAction('pat', function(command) {
			if(!command.actor.isPlayer()) return command.stop()
			this.narrative('rubs his head up against your legs and starts purring like a motorbike')
			if(this.containsThing('key')) {
				this.doCommand('drop key')
			}
			return command.stop()
		})
	}
}