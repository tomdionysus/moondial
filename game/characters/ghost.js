const Character = require('../../lib/Character')

module.exports = function(gameEngine){

	var l = new Character({ id: 'ghost', gameEngine: gameEngine })

	l.init(function() {
		this.setDescription('The ghost is an old man, dressed in dusty professor\'s robes. He looks at you sadly.')

		setInterval(function(){
			switch(1) {
			case 0:
				if (this.gameEngine.player.location.id == this.location.id) {
					return this.narrative('is trying to talk to you. His lips move, but you can\'t hear what he\'s saying.') 
				}
				break
			case 1:
				switch(this.location.id) {
				case 'bedroom':
					this.doCommand('go down')
					break
				case 'mansion':
					if(gameEngine.getRandomInt(1)==0) {
						this.doCommand('go east')
					} else {
						this.doCommand('go up')
					}
					break
				case 'greenhouse':
					this.doCommand('go west')
					break
				}
				break
			case 2:
				if (this.gameEngine.player.location.id == this.location.id) {
					return this.narrative('puts his head in his hands. He appears to be sobbing, but there\'s no sound.') 
				}
				break
			}

		}.bind(this), 10000)
	})

	return l
}