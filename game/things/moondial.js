const Thing = require('../../lib/Thing')

module.exports = function(gameEngine){
	var t = new Thing({ id: 'moondial', gameEngine: gameEngine })

	t.setDescription('The moondial is a large stone plinth with a faded white marble dial, the gnomon is blued steel with a touch of rust.')
	
	t.preventAction('take')
	
	return t
}