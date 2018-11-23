const path = require('path')
const fs = require('fs')
const wrap = require('wordwrap')(80)

require('colors')

const Character = require('./Character')
const CommandRegistry = require('./CommandRegistry')

const HasActions = require('./HasActions')
const Console = require('./Console')

module.exports = class GameEngine {
	constructor(options) {
		options = options || {}
		this.characterClasses = options.characterClasses || {}
		this.locationClasses = options.locationClasses || {}
		this.thingClasses = options.thingClasses || {}

		this.characters = options.characters || {}
		this.locations = options.locations || {}
		this.things = options.things || {}

		this.commandRegistry = options.commandRegistry || CommandRegistry

		this.loadCommands(path.join(__dirname,'../game/commands'))
		this.loadThings(path.join(__dirname,'../game/things'))
		this.loadCharacters(path.join(__dirname,'../game/characters'))
		this.loadLocations(path.join(__dirname,'../game/locations'))

		HasActions(this, options)

		this.allowAction('exit')
		this.allowAction('save')
		this.allowAction('load')

		this.console = new Console()

		this.player = new Character({ id:'you', gameEngine: this, description: 'Surely you know what you look like?' })

	}

	writeLine(str) {
		str = str || ''
		this.console.writeLine(wrap(str))
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
		if(id=='you') return this.player
		return this.characters[id]
	}

	addThing(id, thing) {
		this.things[id] = thing
	}

	getThing(id) {
		return this.things[id]
	}

	start() {		
		this.console.start()

		var self = this
		self.player.doCommand('look')

		this.console.onLine(function(d) {
			d = d.toString().trim()
			if(d.length!=0) {
				self.player.doCommand(d)
				self.writeLine()
			}
		})
	}

	init() {
		this.createThings()
		this.createCharacters()
		this.createLocations()

		this.bootThings()
		this.bootCharacters()
		this.bootLocations()
	}

	loadCommands(base) { this.commandRegistry.load(base) }
	loadCharacters(base) { this._load(this.characterClasses, base) }
	loadLocations(base) { this._load(this.locationClasses, base) }
	loadThings(base) { this._load(this.thingClasses, base) }
	
	createCharacters() { this._create(this.characterClasses, this.characters) }
	createLocations() { this._create(this.locationClasses, this.locations) }
	createThings() { this._create(this.thingClasses, this.things) }

	bootCharacters() { this._boot(this.characters) }
	bootLocations() { this._boot(this.locations) }
	bootThings() { this._boot(this.things) }

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
				if(t) obj[path.basename(file,'.js')] = t
			} catch(e) {
				console.error('Cannot Load',fullPath,e)
			}
		}
	}

	_create(classes, obj) {
		for(var i in classes) {
			obj[i] = classes[i](this)
		}
	}

	_boot(obj) {
		for(var i in obj) {
			obj[i].init()
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

	getRandomInt(max) {
		return Math.floor(Math.random() * Math.floor(max))
	}
}