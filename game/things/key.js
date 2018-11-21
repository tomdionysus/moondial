const Thing = require('../../lib/Thing')

module.exports = function(gameEngine){
	var t = new Thing({ id: 'key', gameEngine: gameEngine })

	t.setDescription('A small iron key.')
	t.hide()

	t.addAfter('take', function(){ this.show() })

	return t
}