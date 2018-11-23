const ContainerFixture = require('../../lib/ContainerFixture')

module.exports = function(gameEngine){
	var t = new ContainerFixture({ id: 'desk', gameEngine: gameEngine })

	t.setDescription('A weathered writing desk. The desk has several drawers with rusty keyholes.')

	var locked = function(cmd) {
		if(!cmd.actor.containsThing('key')) {
			if(cmd.actor.isPlayer()) {
				cmd.gameEngine.writeLine('The desk drawers are locked.')
			}
			return cmd.stop()
		} else {
			if(cmd.actor.isPlayer()) {
				cmd.gameEngine.writeLine('You unlock the desk drawers with the key')
			}
		}
	}

	t.addBefore('search', locked)
	t.addBefore('take', locked)
	t.addBefore('put', locked)

	return t
}