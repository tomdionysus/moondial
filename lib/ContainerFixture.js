const Container = require('./Container')

module.exports = class ContainerFixture extends Container {
	constructor(options) {
		super(options)

		this.preventAction('drop')
		this.preventAction('give')
		this.immovable()
	}
}