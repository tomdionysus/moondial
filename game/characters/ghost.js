const Character = require('../../lib/Character')

module.exports = class Ghost extends Character {
	constructor(options) {
		options.id = 'ghost'
		options.description = 'The ghost is an old man, dressed in dusty professor\'s robes. He looks at you sadly.'
		
		super(options)
	}

	init() {
		setInterval(function(){
			switch(this.gameEngine.getRandomInt(10)) {
			case 0:
				this.wander()
				break
			case 1:
				if (this.isInPlayerLocation()) {
					return this.narrative('is trying to talk to you. His lips move, but you can\'t hear what he\'s saying.') 
				}
				break
			case 2:
				if (this.isInPlayerLocation()) {
					return this.narrative('puts his head in his hands. He appears to be sobbing, but there\'s no sound.') 
				}
				break
			}
		}.bind(this), 10000)
	}

	wander() {
		switch(this.location.id) {
		case 'bedroom':
			this.doCommand('go down')
			break
		case 'mansion':
			if(this.gameEngine.getRandomInt(1)==0) {
				this.doCommand('go east')
			} else {
				this.doCommand('go up')
			}
			break
		case 'greenhouse':
			this.doCommand('go west')
			break
		}
	}
}