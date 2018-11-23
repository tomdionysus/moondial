const ContainerFixture = require('../../lib/ContainerFixture')

module.exports = class Fountain extends ContainerFixture {
	constructor(options) {
		options.id = 'fountain'
		options.description = 'A baroque stone fountain.'
		
		super(options)
	}
}