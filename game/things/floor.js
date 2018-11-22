const Fixture = require('../../lib/Fixture')

module.exports = function(gameEngine){
	var t = new Fixture({ id: 'floor', gameEngine: gameEngine })

	t.setDescription('The mosaic floor is so broken up that you can\'t make out the image.')
	
	return t
}