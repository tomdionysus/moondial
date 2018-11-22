const Location = require('../../lib/Location')

module.exports = function(gameEngine){

	var l = new Location({ id: 'lawns', gameEngine: gameEngine })

	l.setDescription('The lawns and flowerbeds are overgrown and shabby. A huge stone fountain sits at the crossroads of the paths.')

	l.addDirection('north','courtyard')

	l.addThing('fountain').addThing('fish')
	
	l.addCharacter('doggo')

	return l
}