/* This is just a file for testing the code in the browser.
 * I left it here as a quick and dirty example of using the engine.
 */
"use strict";

window.game = (function(CBE) {
	var engine = CBE.Engine,
		game = new CBE.Game(engine),
		gameScreen = window.document.getElementById('game-screen'),
		debugNode = window.document.getElementById('data-window'),
		defaultObserver = new CBE.Observer();

	game.observer(defaultObserver);

	game.systems({
		'render': require('./browser/systems/render')(CBE,game,gameScreen),
		'grid': require('./browser/systems/grid')(CBE,game,gameScreen),
		'keyboard': require('./browser/systems/keyboard')(CBE,game,gameScreen)
	});

	game.entities([{
		'render': [0,0,'#880000'],
		'grid':[1,1,2,2],
		'keyboard' : ['Up','Down','Left','Right']
	},
	{
		'render': [0,0,'#008800'],
		'grid':[1,1,6,2],
		'keyboard' : ['Up','Down','Right']
	}]);

	return game;
})(require('./cbe'));

window.loop = function() {
	game.update();
	setTimeout(loop,30);
}
