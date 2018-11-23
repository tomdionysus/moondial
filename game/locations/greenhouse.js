const Location = require('../../lib/Location')

module.exports = class Greenhouse extends Location {
	constructor(options) {
		options.id = 'greenhouse'
		options.description = 'The greenhouse contains a lot of overgrown plants. The glass is dirty and some of the panes are broken.'

		super(options)
	}

	init() {
		this.addDirection('west','mansion')
	}
}