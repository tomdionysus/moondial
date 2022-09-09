const ContainerFixture = require('../../lib/ContainerFixture')

module.exports = class Grave extends ContainerFixture {
	constructor(options) {
		options.id = 'grave'
		options.description = 'An empty grave.'
		
		super(options)
	}
}