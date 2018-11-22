const Character = require('../../lib/Character')

module.exports = function(gameEngine){

	var l = new Character({ id: 'doggo', gameEngine: gameEngine })

	l.setDescription('Doggo is and old scruffy beagle. He looks a bit morose.')

	l.isOld = true

	setInterval(function(){
		if(this.isOld) {
			if (this.gameEngine.player.location.id == this.location.id) {
				switch(gameEngine.getRandomInt(10)) {
				case 0:
					return this.say('...whine...') 
				}
			}
		} else {
			if (this.gameEngine.player.location.id == this.location.id) {
				switch(gameEngine.getRandomInt(10)) {
				case 0:
					return this.say('woof!') 
				case 1:
					return this.narrative('pants excitedly') 
				case 2:
					return this.narrative('races around you chasing his tail') 
				}
			}
		}
	}.bind(l), 10000)

	l.allowAction('pat')
	l.allowAction('give')

	// Doggo likes dates and gets time
	l.addBefore('give', function(command) {
		if(command.giftThingId!='calendar') {
			this.narrative('doesn\'t want '+command.giftThingId)
			return command.stop()
		}
		return
	})

	l.addAfter('give', function(command) {
		if(command.giftThingId!='calendar') return
		this.narrative('licks dates off the calendar')
		this.gameEngine.writeLine('A miraculous transformation occurs. Doggo seems to get younger before your eyes, his eyes become brighter, his fur darker, and he suddenly looks a lot happier.')
		l.setDescription('Doggo is a young beagle with shiny fur and flappy ears. He\'s still a bit artfully scruffy, though.')
		this.isOld = false
		return command.stop()
	})

	l.addAfter('pat', function(command) {
		if(!command.actor.isPlayer()) return command.stop()
		if(this.isOld) {
			this.narrative('sighs')
		} else {
			this.narrative('wags tail and gambols around you')
			return this.say('yip!') 
		}
		return command.stop()
	})

	return l
}