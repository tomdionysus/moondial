const Thing = require('../../lib/Thing')

module.exports = function(gameEngine){
	var t = new Thing({ id: 'floor', gameEngine: gameEngine })

	t.setDescription('The mosaic floor is so broken up that you can\'t make out the image.')

	return t
}