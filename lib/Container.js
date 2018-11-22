const Thing = require('./Thing')
const HasThings = require('./HasThings')

module.exports = class Container extends Thing {
	constructor(options) {
		super(options)

		HasThings(this, options)
		
		this.allowAction('search')
		this.allowAction('put')
		this.allowAction('take')
	}
}