const Location = require('../../lib/Location')

module.exports = function(gameEngine){

	var l = new Location({ id: 'courtyard', gameEngine: gameEngine })

	l.init(function(){
		this.setDescription('You are in a courtyard. This night air is clear and sharp, the moon shines high and bright in the sky. Well-tended lawns stretch away south, as the dark stone ruins of the mansion block the stars to the north.')
		
		this.addThing('moondial')
		this.addThing('gnomon')
		
		this.addCharacter('gallagher')

		this.addDirection('north','mansion')
		this.addDirection('south','lawns')
	})

	return l
}