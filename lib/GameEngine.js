const fs = require('fs')
const path = require('path')
const wrap = require('wordwrap')(80)

const Character = require('./Character')

const HasActions = require('./HasActions')

module.exports = class GameEngine {
	constructor(options) {
		options = options || {}
		this.characterClasses = options.characterClasses || {}
		this.locationClasses = options.locationClasses || {}
		this.thingClasses = options.thingClasses || {}

		this.characters = options.characters || {}
		this.locations = options.locations || {}
		this.things = options.things || {}

		HasActions(this, options)

		this.addAction('exit',this.actionExit)
		this.addAction('save',this.actionSave)
		this.addAction('load',this.actionLoad)
		this.addAction('help',this.actionHelp)

		this.addAction('debug',this.actionDebug)
		this.addAction('debugThings',this.actionDebugThings)

		this.player = new Character({ id:'player', gameEngine: this })
	}

	writeLine(str) {
		str = str || ''
		console.log(wrap(str))
	}

	get(id) {
		var obj = this.getCharacter(id)
		if(!obj) obj = this.getLocation(id)
		if(!obj) obj = this.getThing(id)
		return obj
	}

	addLocation(id, location) {
		this.locations[id] = location
	}

	getLocation(id) {
		return this.locations[id]
	}

	getCharacter(id) {
		return this.characters[id]
	}

	addThing(id, thing) {
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
		self.player.doCommand('look')

		stdin.addListener('data', function(d) {
			self.process(d.toString().trim())
			self.writeLine()
			process.stdout.write('> ')
		})
		process.stdout.write('> ')
	}

	loadCharacters(base) { this._load(this.characterClasses, base) }
	loadLocations(base) { this._load(this.locationClasses, base) }
	loadThings(base) { this._load(this.thingClasses, base) }
	bootCharacters() { this._boot(this.characterClasses, this.characters) }
	bootLocations() { this._boot(this.locationClasses, this.locations) }
	bootThings() { this._boot(this.thingClasses, this.things) }

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

	_boot(classes, obj) {
		for(var i in classes) {
			obj[i] = classes[i](this)
		}
	}

	process(str) {
		if(this.player.doCommand(str)) return 
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

	actionDebug(terms) {
		for(var i in terms) {
			var obj = this.getThing(terms[i])
			if(!obj) obj = this.getLocation(terms[i])
			if(!obj) obj = this.getCharacter(terms[i])
			if(!obj) return console.log(terms[i]+' not found')
			console.log(obj)
		}
	}

	actionDebugThings(terms) {
		for(var i in terms) {
			var obj = this.getThing(terms[i])
			if(!obj) obj = this.getLocation(terms[i])
			if(!obj) return console.log(terms[i]+' not found')
			if(!obj.things) return console.log(terms[i]+' cannnot have things')
			console.log(Object.keys(obj.things))
		}
	}
}