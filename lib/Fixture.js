const Thing = require('./Thing')

module.exports = class Fixture extends Thing {
	constructor(options) {
		super(options)

		this.preventAction('take')
		this.preventAction('drop')
		this.preventAction('give')
		this.immovable()
	}
}