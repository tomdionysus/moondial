const Character = require('../../lib/Character')

module.exports = class Ghost extends Character {
	constructor(options) {
		options.id = 'ghost'
		options.description = 'The ghost is an old man, dressed in dusty professor\'s robes. He looks at you sadly.'

		super(options)

	}

	init() {
		this.following = false
		this.lastTime = new Date()
		this.allowAction('teleport')

		this.interval = setInterval(() => {
			if(this.gameEngine.player.containsThing('skeleton')) {
				if(this.gameEngine.player.location.id !== this.location.id) {
					this.doCommand('teleport '+this.gameEngine.player.location.id)
				}

				if ((new Date()) - this.lastTime < 10000) return
				this.lastTime = new Date()

				switch(this.gameEngine.getRandomInt(10)) {
				case 0:
					if (this.isInPlayerLocation()) {
						return this.narrative('is looking at you hopefully.') 
					}
					break
				case 1:
					if (this.isInPlayerLocation()) {
						return this.narrative('is talking animatedly at you, but you can\'t hear his voice.') 
					}
					break
				}

			} else {
				if (['bedroom','mansion','greenhouse'].indexOf(this.location.id) === -1) this.doCommand('teleport bedroom')

				if ((new Date()) - this.lastTime < 10000) return
				this.lastTime = new Date()

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
			}
		}, 1000)
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