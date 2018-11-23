const Character = require('../../lib/Character')

module.exports = function(gameEngine){

	var l = new Character({ id: 'gallagher', gameEngine: gameEngine })

	l.init(function() {
		this.setDescription('Gallagher is a large, friendly ginger cat. He\'s a bit shy.')

		setInterval(function(){
			if (this.gameEngine.player.location == this.location) {
				switch(gameEngine.getRandomInt(10)) {
				case 0:
					return this.say('bbrrrt!') 
				case 1:
					return this.say('meowww...') 
				case 2:
					return this.narrative('rolls around on the ground showing his belly to you.')
				}
			}
		}.bind(this), 10000)

		this.allowAction('pat')
		this.allowAction('give')

		this.addThing('key')

		// Gallagher only wants the fish.
		this.addBefore('give', function(command) {
			if(command.giftThingId!='fish') {
				this.narrative('doesn\'t want '+command.giftThingId)
				return command.stop()
			}
			return
		})

		// Gallagher loves fish.
		this.addAfter('give', function(command) {
			if(command.giftThingId!='fish') return
			this.narrative('is really loving his fish')
			this.say('...purrr!')
			this.setDescription('Gallagher is a large, friendly ginger cat. He\'s a bit shy. He\'s carrying a small fish around and looking very pleased with himself.')
		})

		this.addBefore('pat', function(command) {
			if(!command.actor.isPlayer()) return command.stop()
			// Gallagher will let you pat him if he has the fish
			if(this.containsThing('fish')) return
			// 
			this.narrative('runs away when you try to pat him. He sits down again further away and regards you playfully.')
			this.say('...brrtt...')
			command.stop()
			return 
		})

		this.addAfter('pat', function(command) {
			if(!command.actor.isPlayer()) return command.stop()
			this.narrative('rubs his head up against your legs and starts purring like a motorbike')
			if(this.containsThing('key')) {
				this.doCommand('drop key')
			}
			return command.stop()
		})
	})

	return l
}