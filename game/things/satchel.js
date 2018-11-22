const Container = require('../../lib/Container')

module.exports = function(gameEngine){
	var t = new Container({ id: 'satchel', gameEngine: gameEngine })

	t.setDescription('The satchel is a sturdy bag made out of worn leather. It has a handy strap for carrying.')

	t.preventAction('give')
	t.preventAction('drop')

	return t
}