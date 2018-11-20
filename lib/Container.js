const Thing = require('./Thing')
const HasThings = require('./HasThings')

module.exports = class Container extends Thing {
	constructor(options) {
		options = options || {}

		super(options)

		HasThings(this, options)

		this.addAction('search',this.actionSearch)
	}

	actionSearch() {
		this.gameEngine.writeLine(this.id+' contains: '+this.getVisibleThings().join(', '))
	}
}