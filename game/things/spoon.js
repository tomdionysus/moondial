const Thing = require('../../lib/Thing')

module.exports = function(gameEngine){
	var t = new Thing({ id: 'spoon', gameEngine: gameEngine })

	t.setDescription('The spoon is not bent.')
	t.hide()

	t.addAfter('take',function(){
		this.show()
	})

	return t
}