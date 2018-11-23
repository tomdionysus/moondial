const Location = require('../../lib/Location')

module.exports = function(gameEngine){

	var l = new Location({ id: 'greenhouse', gameEngine: gameEngine })
	
	l.init(function(){
		this.setDescription('The greenhouse contains a lot of overgrown plants. The glass is dirty and some of the panes are broken.')

		this.addDirection('west','mansion')
	})

	return l
}