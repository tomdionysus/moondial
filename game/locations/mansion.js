const Location = require('../../lib/Location')

module.exports = class Mansion extends Location {
	constructor(options) {
		options.id = 'mansion'
		options.description = 'The ruins of the mansion block out the stars above. A ruined staircase leads up from a cracked and broken mosaic floor. Moss grows on the floor.'

		super(options)
	}

	init() {
		this.addThing('floor')
		this.addThing('calendar')

		this.addDirection('up','bedroom')
		this.addDirection('south','courtyard')
		this.addDirection('east','greenhouse')
	}
}