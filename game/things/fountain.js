const Container = require('../../lib/Container')

module.exports = function(gameEngine){
	var t = new Container({ id: 'fountain', gameEngine: gameEngine })

	t.setDescription('A baroque stone fountain.')

	return t
}