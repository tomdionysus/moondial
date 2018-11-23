const Location = require('../../lib/Location')

module.exports = function(gameEngine){

	var l = new Location({ id: 'mansion', gameEngine: gameEngine })

	l.init(function(){
		this.setDescription('The ruins of the mansion block out the stars above. A ruined staircase leads up from a cracked and broken mosaic floor. Moss grows on the floor.')
		this.addThing('floor')
		this.addThing('calendar')

		this.addDirection('up','bedroom')
		this.addDirection('south','courtyard')
		this.addDirection('east','greenhouse')
	})

	return l
}