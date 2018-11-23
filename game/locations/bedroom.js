const Location = require('../../lib/Location')

module.exports = function(gameEngine){

	var l = new Location({ id: 'bedroom', gameEngine: gameEngine })

	l.setDescription('The roof bedroom is mostly complete, the tattered drapes of an old four-posted bed blow in the wind. A weathered writing desk sits in the corner')
	l.addThing('desk')

	l.addDirection('down','mansion')

	return l
}