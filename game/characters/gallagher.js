const Character = require('../../lib/Character')

function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

module.exports = function(gameEngine){

	var l = new Character({ id: 'gallagher', gameEngine: gameEngine })

	l.setDescription('Gallagher is a large, friendly ginger cat. He\'s a bit shy.')

	setInterval(function(){
		if (this.gameEngine.player.location == this.location) {
			if(getRandomInt(10) == 0) { return this.say('bbrrrt!') }
			if(getRandomInt(10) == 1) { return this.say('meowww...') }
			if(getRandomInt(10) == 2) { return this.narrative('rolls around on the ground showing his belly to you.') }
		}
	}.bind(l), 10000)

	l.addAction('pat', function(actor) {
		if(actor!=this.gameEngine.player) return true
		this.gameEngine.writeLine('gallagher rubs his head up against you.')
		this.say('...purr...')
		return true
	})

	l.addBefore('pat', function(actor) {
		if(actor!=this.gameEngine.player) return true
		this.gameEngine.writeLine('gallagher notices you moving toward him and runs away.')
		this.say('...brrtt...')
		this.doCommand('go north')
		return true
	})

	return l
}