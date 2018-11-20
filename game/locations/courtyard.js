const Location = require('../../lib/Location')

module.exports = function(gameEngine){

	var l = new Location({ id: 'courtyard', gameEngine: gameEngine })

	l.setDescription('You are in a courtyard. This night air is clear and sharp, the moon shines high and bright in the sky. Well-tended lawns stretch away south, as the dark stone ruins of the mansion block the stars to the north.')
	l.addThing('moondial')
	l.addThing('gnomon')
	l.addCharacter('gallagher')

	l.addExit('north','mansion')
	l.addExit('south','lawns')

	return l
}