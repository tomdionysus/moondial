const Character = require('../../lib/Character')

module.exports = function(gameEngine){

	var l = new Character({ id: 'gallagher', gameEngine: gameEngine })

	l.setDescription('Gallagher is a large, friendly ginger cat. He\'s a bit shy.')

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
	}.bind(l), 10000)

	l.allowAction('pat')
	l.allowAction('give')

	l.addThing('key')

	// Gallagher only wants the fish.
	l.addBefore('give', function(command) {
		if(command.giftThingId!='fish') {
			this.narrative('doesn\'t want '+command.giftThingId)
			return command.stop()
		}
		return
	})

	// Gallagher loves fish.
	l.addAfter('give', function(command) {
		if(command.giftThingId!='fish') return
		this.narrative('is really loving his fish')
		this.say('...purrr!')
		this.setDescription('Gallagher is a large, friendly ginger cat. He\'s a bit shy. He\'s carrying a small fish around and looking very pleased with himself.')
	})

	l.addBefore('pat', function(command) {
		if(!command.actor.isPlayer()) return command.stop()
		// Gallagher will let you pat him if he has the fish
		if(this.containsThing('fish')) return
		// 
		this.narrative('runs away when you try to pat him. He sits down again further away and regards you playfully.')
		this.say('...brrtt...')
		command.stop()
		return 
	})

	l.addAfter('pat', function(command) {
		if(!command.actor.isPlayer()) return command.stop()
		this.narrative('rubs his head up against your leg and starts purring like a motorbike')
		if(this.containsThing('key')) {
			this.doCommand('drop key')
		}
		return command.stop()
	})

	return l
}