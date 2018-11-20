const Thing = require('../../lib/Thing')

module.exports = function(gameEngine){
	var t = new Thing({ id: 'fish', gameEngine: gameEngine })

	t.setDescription('A small cooked fish.')
	t.hide()

	t.addAfter('take',function(){
		this.show()
	})

	return t
}