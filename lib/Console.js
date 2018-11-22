module.exports = class Console {
	constructor(options) {
		options = options || {}
		this.stdin = options.stdin || process.stdin
		this.stdin.setRawMode(true)
		this.stdout = options.stdout || process.stdout
		this.stdoutWidth = this.stdout.columns || 80
		this.currentBuffer = ''

		this.history = []
		this.historyPos = null
	}

	start() {
		this.stdout.on('resize', function(){
			this.stdoutWidth = this.stdout.columns || 80
		}.bind(this))

		this.stdin.on('data', function(chunk) {
			// console.log(chunk)
			switch(chunk[0]) {
			case 0x1b:
				if(chunk[1] != 0x5b) break
				switch(chunk[2]) {
				case 0x41:
					// Up
					if(this.historyPos==null) { 
						this.history.push(this.currentBuffer)
						while(this.history.length > 80) this.history.shift()
						this.historyPos = this.history.length-1
					}
					this.historyPos = Math.max(this.historyPos-1, 0)
					this.currentBuffer = this.history[this.historyPos]
					this.clearLine()
					this.drawPrompt()
					break
				case 0x42:
					// Down
					this.historyPos = Math.min(this.historyPos+1, this.history.length-1)
					this.currentBuffer = this.history[this.historyPos]
					this.clearLine()
					this.drawPrompt()
					break
				case 0x43:
					// Right
					break
				case 0x44:
					// Left
					break
				}
				break 
			case 0x03:
				this.historyPos=null
				this.stdout.write('\n')
				process.exit()
				break
			case 0x7f:
				this.historyPos=null
				this.currentBuffer = this.currentBuffer.substr(0,this.currentBuffer.length-1)
				this.clearLine()
				this.drawPrompt()
				break
			case 0x09:
				this.historyPos=null
				//TODO: Tab Completion
				break
			case 0x0d:
				this.historyPos=null
				this.history.push(this.currentBuffer)
				this.writeLine('> '+this.currentBuffer)
				this.fn(this.currentBuffer)
				this.currentBuffer = ''
				this.clearLine()
				this.drawPrompt()
				break
			default:
				this.historyPos=null
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