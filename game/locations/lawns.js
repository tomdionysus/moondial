const Location = require('../../lib/Location')

module.exports = function(gameEngine){

	var l = new Location({ id: 'lawns', gameEngine: gameEngine })

	l.setDescription('The lawns and flowerbeds are overgrown and shabby. A huge stone fountain sits at the crossroads of the paths.')
	l.addThing('fish')

	l.addDirection('north','courtyard')
	// l.addDirection('west','maze')

	return l
}