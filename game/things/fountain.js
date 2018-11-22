const ContainerFixture = require('../../lib/ContainerFixture')

module.exports = function(gameEngine){
	var t = new ContainerFixture({ id: 'fountain', gameEngine: gameEngine })

	t.setDescription('A baroque stone fountain.')

	return t
}