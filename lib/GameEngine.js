const path = require('path')
const fs = require('fs')
const wrap = require('wordwrap')(80)

const Character = require('./Character')
const CommandRegistry = require('./CommandRegistry')
const CommandStatus = require('./CommandStatus')

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

		this.commandRegistry = options.commandRegistry || CommandRegistry

		HasActions(this, options)

		this.allowAction('exit',this.actionExit)
		this.allowAction('save',this.actionSave)
		this.allowAction('load',this.actionLoad)

		this.allowAction('debug',this.actionDebug)
		this.allowAction('debugThings',this.actionDebugThings)

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
		self.process('look')

		stdin.addListener('data', function(d) {
			d = d.toString().trim()
			if(d.length!=0) {
				self.process(d)
				self.writeLine()
			}
			process.stdout.write('> ')
		})
		process.stdout.write('> ')
	}

	loadCommands(base) { this.commandRegistry.load(base) }
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
		var x = CommandRegistry.parse(this.player, str)
		if(x.thing) {
			if(x.thing.processBefore(x)) return
		}
		if(!x) return this.writeLine('I didn\'t understand that.')
		if(x instanceof CommandStatus && x.actor == this.player) return this.writeLine(x.message)
		x = x.execute()
		if(x instanceof CommandStatus && x.actor == this.player) return this.writeLine(x.message)
		if(x.thing) {
			if(x.thing.processAfter(x)) return
		}
	}

	actionExit() {
		this.writeLine('Shutting your eyes, you tell yourself you will wake on the count of 3.')
		process.exit()
	}

	actionSave() {
	}

	actionLoad() {
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