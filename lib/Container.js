const Thing = require('./Thing')
const HasThings = require('./HasThings')

module.exports = class Container extends Thing {
	constructor(options) {
		options = options || {}

		super(options)

		HasThings(this, options)
		this.allowAction('search')
	}

	actionSearch(actor) {
		if(actor!=this.gameEngine.player && this.location==this.gameEngine.player.location) {
			this.gameEngine.writeLine(actor.id+' searches '+this.id+'.')
			return true
		}
		this.gameEngine.writeLine(this.id+' contains: '+this.getVisibleThings().join(', '))
		return true
	}
}