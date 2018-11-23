const Location = require('../../lib/Location')

module.exports = function(gameEngine){

	var l = new Location({ id: 'lawns', gameEngine: gameEngine })

	l.init(function(){
		this.setDescription('The lawns and flowerbeds are overgrown and shabby. A huge stone fountain sits at the crossroads of the paths.')

		this.addDirection('north','courtyard')

		this.addThing('fountain').addThing('fish')
		
		this.addCharacter('doggo')
	})

	return l
}