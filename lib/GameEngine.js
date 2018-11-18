const fs = require('fs')
const path = require('path')
const justify = require('justified')

const Character = require('./Character')

module.exports = class GameEngine {
	constructor(options) {
		options = options || {}
		this.locationClasses = options.locationClasses || {}
		this.thingClasses = options.thingClasses || {}

		this.locations = options.locations || {}
		this.things = options.things || {}

		this.player = new Character({ gameEngine: this })
	}

	addLocation(id, location) {
		location.gameEngine = this
		this.locations[id] = location
	}

	getLocation(id) {
		return this.locations[id]
	}

	addThing(id, thing) {
		thing.gameEngine = this
		this.things[id] = thing
	}

	getThing(id) {
		return this.things[id]
	}

	start() {
		this.bootThings()
		this.bootLocations()

		console.log(justify(this.player.location.description))
		console.log()
		console.log(justify('You can see: '+this.player.location.getThings().join(', ')))
		console.log(justify('You can go: '+this.player.location.getDirections().join(', ')))

		while(true) {

		}
	}

	loadLocations(base) {
		this._load(this.locationClasses, base)
	}

	bootLocations() {
		for(var i in this.locationClasses) {
			var x = this.locationClasses[i](this)
			this.locations[i] = x
		}
	}

	loadThings(base) {
		this._load(this.thingClasses, base)
	}

	bootThings() {
		for(var i in this.thingClasses) {
			var x = this.thingClasses[i](this)
			this.things[i] = x
		}
	}

	_load(obj, base) {
		var files = fs.readdirSync(base)
		for(var i in files) {
			var file = files[i]
			var fullPath = path.join(base, file)
			var stats = fs.statSync(fullPath)
			if (stats.isDirectory()) {
				this._load(obj[file] = {}, fullPath)
				continue 
			}
			if (path.extname(file)!='.js') continue

			try {
				var t = require(fullPath)
				obj[path.basename(file,'.js')] = t
			} catch(e) {
				console.error('Cannot Load',fullPath,e)
			}
		}
	}
}