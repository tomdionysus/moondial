const Character = require('../../lib/Character')

module.exports = class Danjite extends Character {
	constructor(options) {
		options.id = 'danjite'
		options.description = 'SHOULD NOT BE SEEN'
		
		super(options)

		this.form = 'swiss_cheese'
	}

	init() {
		setInterval(function(){
			switch(this.gameEngine.getRandomInt(11)) {
			case 0:
				this.wander()
				break
			// case 1:
			// 	if (this.isInPlayerLocation()) {
			// 		switch(this.gameEngine.getRandomInt(1)) {
			// 			return this.narrative('') 
			// 		}
			// 	}
			// 	break
			case 2:
				break
			}
			this.shapeShift()
		}.bind(this), 10000)

		this.shapeShift()

	}

	shapeShift() {
		var previousForm = this.currentForm
		switch(this.gameEngine.getRandomInt(2)) {
		case 0:
			this.setDescription('Danjite is a turtle with a large star etched on its shell') 
			this.currentForm = 'turtle'
			break
		case 1:
			this.setDescription('Danjite is a wedge of swiss cheese with six legs') 
			this.currentForm = 'swiss_cheese'
			break
		case 2:
			this.setDescription('Danjite is a burgundy-coloured top hat') 
			this.currentForm = 'top_hat'
			break
		}
		if (this.gameEngine && this.location && this.isInPlayerLocation() && previousForm!=this.currentForm) {
			this.narrative('changes forms - bamf!')
		}
	}

	wander() {
		switch(this.location.id) {
		case 'courtyard':
			this.doCommand('go south')
			break
		case 'lawns':
			if(this.gameEngine.getRandomInt(1)==0) {
				this.doCommand('go south')
			} else {
				this.doCommand('go north')
			}
			break
		case 'maze':
			this.doCommand('go west')
			break
		}
	}
}