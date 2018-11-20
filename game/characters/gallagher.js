const Character = require('../../lib/Character')

module.exports = function(gameEngine){

	var l = new Character({ id: 'gallagher', gameEngine: gameEngine })

	l.setDescription('Gallagher is a large, friendly ginger cat. He\'s a bit shy.')

	return l
}