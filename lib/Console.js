module.exports = class Console {
	constructor(options) {
		options = options || {}
		this.stdin = options.stdin || process.stdin
		this.stdin.setRawMode(true)
		this.stdout = options.stdout || process.stdout
		this.stdoutWidth = this.stdout.columns || 80
		this.currentBuffer = ''
	}

	start() {
		this.stdout.on('resize', function(){
			this.stdoutWidth = this.stdout.columns || 80
		}.bind(this))

		this.stdin.on('data', function(chunk) {
			// console.log(chunk)
			switch(chunk[0]) {
			case 0x03:
				this.stdout.write('\n')
				process.exit()
				break
			case 0x7f:
				this.currentBuffer = this.currentBuffer.substr(0,this.currentBuffer.length-1)
				break
			case 0x09:
				//TODO: Tab Completion
				break
			case 0x0d:
				this.fn(this.currentBuffer)
				this.currentBuffer = ''
				this.clearLine()
				break
			default:
				this.currentBuffer += chunk.toString()
			}
			this.drawPrompt()
		}.bind(this))
	}

	onLine(fn) {
		this.fn = fn
	}

	clearLine() {
		this.stdout.write('\r'+(' '.repeat(this.stdoutWidth))+'\r')
	}

	writeLine(str) {
		this.clearLine()
		this.stdout.write(str+'\n')
		this.drawPrompt()
	}

	drawPrompt() {
		this.stdout.write('\r> '+this.currentBuffer)
	}
}