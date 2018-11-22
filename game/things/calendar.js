const Thing = require('../../lib/Thing')

module.exports = function(gameEngine){
	var t = new Thing({ id: 'calendar', gameEngine: gameEngine })

	t.setDescription('A tatty calendar with pictures of dogs.')

	return t
}