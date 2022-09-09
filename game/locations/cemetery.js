const Location = require('../../lib/Location')

module.exports = class Cemetery extends Location {
	constructor(options) {
		options.id = 'cemetery'
		options.description = 'The cemetery smells of rich earth. Gravestones jut out of ground like broken teeth, some of them are smashed. The moon shines through an ancient oak tree, casting strange beams on the ground.'

		super(options)
	}

	init() {
		this.addDirection('east','lawns')
	}

	beforeDig(cmd) {
		if(this.containsThing('grave')) {
			this.gameEngine.writeLine('There\'s aready an empty grave here.')
			cmd.stop()
		}
	}

	afterDig() {
		this.gameEngine.writeLine('You dig a grave. This is spooky')
		this.addThing('grave')
	}
}