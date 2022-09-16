const path = require('path')
const fs = require('fs')
const wrap = require('wordwrap')(80)

require('colors')

const Character = require('./Character')
const Registry = require('./Registry')
const CommandRegistry = require('./CommandRegistry')

const HasActions = require('./HasActions')
const Console = require('./Console')

const pkg = require('../package.json')

module.exports = class GameEngine {
	constructor(options) {
		options = options || {}

		// So we can see gameEngine genercally
		this.gameEngine = this

		this.baseRegistry = options.baseRegistry || new Registry()
		this.baseRegistry.load(path.join(__dirname))

		this.commandRegistry = options.commandRegistry || new CommandRegistry()
		this.commandRegistry.load(path.join(__dirname,'../game/commands'))

		this.characterClasses = options.characterClasses || new Registry()
		this.characterClasses.load(path.join(__dirname,'../game/characters'))

		this.locationClasses = options.locationClasses || new Registry()
		this.locationClasses.load(path.join(__dirname,'../game/locations'))

		this.thingClasses = options.thingClasses || new Registry()
		this.thingClasses.load(path.join(__dirname,'../game/things'))

		this.characters = options.characters || {}
		this.locations = options.locations || {}
		this.things = options.things || {}

		this._serializehooks = []
		this._deserializehooks = []

		HasActions(this, options)

		this.allowAction('exit')
		this.allowAction('save')
		this.allowAction('load')

		this.console = new Console()

		this.player = new Character({ id:'you', gameEngine: this, description: 'Surely you know what you look like?' })
	}

	init() {
		this.characters = this.characterClasses.instantiateAll({gameEngine:this})
		this.locations = this.locationClasses.instantiateAll({gameEngine:this})
		this.things = this.thingClasses.instantiateAll({gameEngine:this})

		this.bootThings()
		this.bootCharacters()
		this.bootLocations()
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

	getClass(name) {
		return this.baseRegistry.get(name) ||
			this.commandRegistry.get(name) ||
			this.characterClasses.get(name) ||
			this.locationClasses.get(name) ||
			this.thingClasses.get(name)
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

		this.player.doCommand('look')

		this.console.onLine((d) => {
			d = d.toString().trim()
			if(d.length!=0) {
				this.player.doCommand(d)
				this.writeLine()
			}
		})
	}

	loadCommands(base) { this.commandRegistry.load(base) }
	loadCharacters(base) { this._load(this.characterClasses, base) }
	loadLocations(base) { this._load(this.locationClasses, base) }
	loadThings(base) { this._load(this.thingClasses, base) }

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

	serialize() {
		var obj = {
			version: pkg.version,
			characters: [],
			locations: [],
			things: [],
			player: this.player.serialize()
		}

		for(let x in this.characters) obj.characters.push(this.characters[x].serialize())
		for(let x in this.locations) obj.locations.push(this.locations[x].serialize())
		for(let x in this.things) obj.things.push(this.things[x].serialize())

		return obj
	}

	deserialize(obj) {
		var newCharacters = {}
		var newLocations = {}
		var newThings = {}
		try {
			for(let x in obj.things) { x = obj.things[x]; let kls = this.getClass(x.class); newThings[x.id] = new kls({ gameEngine: this }); newThings[x.id].deserialize(x) }
			for(let x in obj.characters) { x = obj.characters[x]; let kls = this.getClass(x.class); newCharacters[x.id] = new kls({ gameEngine: this }); newCharacters[x.id].deserialize(x) }
			for(let x in obj.locations) { x = obj.locations[x]; let kls = this.getClass(x.class); newLocations[x.id] = new kls({ gameEngine: this }); newLocations[x.id].deserialize(x) }
		
			this.characters = newCharacters
			this.locations = newLocations
			this.things = newThings

			this.player.deserialize(obj.player)

		} catch (e) {
			console.log("Failed to load game",e)
		} 

		this.player.doCommand('look')
	}
}