const Thing = require('../../lib/Thing')

module.exports = function(gameEngine){
	var t = new Thing({ id: 'gnomon', gameEngine: gameEngine })

	t.setDescription('The gnomon is a piece of metal about the length of your hand. It is made from steel with a little rust, and its tip is slightly bent.')
	t.hide()

	t.addAfter('*', function(){ this.show() })

	return t
}