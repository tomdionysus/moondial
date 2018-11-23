const Location = require('../../lib/Location')

module.exports = function(gameEngine){

	var l = new Location({ id: 'bedroom', gameEngine: gameEngine })

	l.init(function(){
		this.setDescription('The roof bedroom is mostly complete, the tattered drapes of an old four-posted bed blow in the wind. A weathered writing desk sits in the corner')
		
		this.addThing('desk')

		this.addCharacter('ghost')
		
		this.addDirection('down','mansion')
	})

	return l
}