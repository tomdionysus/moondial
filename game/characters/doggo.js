const Character = require('../../lib/Character')

module.exports = class Doggo extends Character {
	constructor(options) {
		options.id = 'doggo'
		options.description = 'Doggo is and old scruffy beagle. He looks a bit morose.'
		
		super(options)

		this.isOld = true
	}

	init() {
		this.isOld = true

		setInterval(function(){
			if(this.isOld) {
				if (this.isInPlayerLocation()) {
					switch(this.gameEngine.getRandomInt(10)) {
					case 0:
						return this.say('...whine...') 
					}
				}
			} else {
				if (this.isInPlayerLocation()) {
					switch(this.gameEngine.getRandomInt(10)) {
					case 0:
						return this.say('woof!') 
					case 1:
						return this.narrative('pants excitedly') 
					case 2:
						return this.narrative('races around you chasing his tail') 
					}
				}
			}
		}.bind(this), 10000)

		this.allowAction('pat')
		this.allowAction('give')

		// Doggo only wants the calendar
		this.addBefore('give', function(command) {
			if(command.giftThingId!='calendar') {
				this.narrative('doesn\'t want '+command.giftThingId)
				return command.stop()
			}
			return
		})

		// The calendar gives doggo time and makes him young again
		this.addAfter('give', function(command) {
			if(command.giftThingId!='calendar') return
			this.narrative('licks dates off the calendar')
			this.gameEngine.writeLine('A miraculous transformation occurs. Doggo seems to get younger before your eyes, his eyes become brighter, his fur darker, and he suddenly looks a lot happier.')
			this.setDescription('Doggo is a young beagle with shiny fur and floppy ears. He\'s still a bit artfully scruffy, though.')
			this.isOld = false
			return command.stop()
		})

		this.addAfter('pat', function(command) {
			if(!command.actor.isPlayer()) return command.stop()
			if(this.isOld) {
				this.narrative('sighs')
			} else {
				this.narrative('wags tail and gambols around you')
				return this.say('yip!') 
			}
			return command.stop()
		})
	}
}