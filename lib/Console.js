const readline = require('readline')

module.exports = class Console {
	constructor(options) {
		options = options || {}
		this.stdin = options.stdin || process.stdin
		this.stdin.setRawMode(true)
		this.stdout = options.stdout || process.stdout
	}

	start() {
		this.rlInterface = readline.createInterface({
			input: process.stdin,
			output: process.stdout,
		})

		this.rlInterface.on('line', function(line) {
			this.fn(line)
		}.bind(this))

		this.rlInterface.on('close', function() {
			this.fn('exit')
		}.bind(this))

		this.rlInterface.on('SIGINT', function() {
			this.fn('exit')
		}.bind(this))
	}

	onLine(fn) {
		this.fn = fn
	}

	clearLine() {
		this.stdout.clearLine()
		this.stdout.cursorTo(0)
	}

	writeLine(str) {
		this.clearLine()
		this.stdout.write(str+'\n')
		this.drawPrompt()
	}

	drawPrompt() {
		this.stdout.write('\r> ')
	}
}