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
			return true
		}
		return false
	})

	// Gallagher loves fish.
	l.addAfter('give', function(command) {
		if(command.giftThingId!='fish') return false
		this.narrative('is really loving his fish')
		this.say('...purrr!')
	})

	// Gallagher won't let you pat him until he has the fish.
	l.addBefore('pat', function(command) {
		if(!command.actor.isPlayer()) return true
		if(this.containsThing('fish')) return false
		this.narrative('notices you moving toward him and runs away')
		this.say('...brrtt...')
		return true
	})

	l.addAfter('pat', function(command) {
		if(!command.actor.isPlayer()) return true
		this.narrative('rubs his head up against your leg and starts purring like a motorbike')
		if(this.containsThing('key')) {
			this.doCommand('drop key')
		}
		return true
	})


	return l
}