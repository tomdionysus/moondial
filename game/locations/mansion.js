const Location = require('../../lib/Location')

module.exports = function(gameEngine){

	var l = new Location({ id: 'mansion', gameEngine: gameEngine })

	l.setDescription('The ruins of the mansion block out the stars above. A ruined staircase leads up from a cracked and broken mosaic floor. Moss grows on the floor.')
	l.addThing('floor')
	l.addThing('calendar')
	l.addThing('fish')

	l.addDirection('up','bedroom')
	l.addDirection('south','courtyard')

	return l
}