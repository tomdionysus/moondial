const fs = require('fs')
const path = require('path')
const wrap = require('wordwrap')(80)

const Character = require('./Character')
const HasActions = require('./HasActions')

module.exports = class GameEngine {
	constructor(options) {
		options = options || {}
		this.locationClasses = options.locationClasses || {}
		this.thingClasses = options.thingClasses || {}

		this.locations = options.locations || {}
		this.things = options.things || {}

		HasActions(this, options.actions)
		this.addAction('exit',this.actionExit)
		this.addAction('save',this.actionSave)
		this.addAction('load',this.actionLoad)
		this.addAction('help',this.actionHelp)

		this.player = new Character({ gameEngine: this })
	}

	writeLine(str) {
		str = str || ''
		console.log(wrap(str))
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

		var self = this
		var stdin = process.openStdin()
		self.player.actionLook()

		stdin.addListener('data', function(d) {
			self.process(d.toString().trim())
			self.writeLine()
			process.stdout.write('> ')
		})
		process.stdout.write('> ')
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

	process(str) {
		var parsed = str.split(' ')
		var cmd = parsed.shift()
		if(cmd && cmd!='') {
			if(this.player.can(cmd)) return this.player.do(cmd, parsed)
			if(this.player.location.can(cmd)) return this.player.location.do(cmd,parsed)
			if(this.can(cmd)) return this.do(cmd,parsed)
		} 
		this.writeLine('I didn\'t understand that.')
	}

	actionExit() {
		this.writeLine('Shutting your eyes, you tell yourself you will wake on the count of 3.')
		process.exit()
	}

	actionSave() {
	}

	actionLoad() {
	}

	actionHelp() {
		var actions = [].concat(this.getActions(), this.player.getActions(), this.player.location.getActions())
		this.writeLine('Actions: '+actions.join(', '))
	}
}