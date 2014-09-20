"use strict";

module.exports = function(CBE,game,context) {
  var Keyboard = new CBE.System(),


    onKeyEvent = (function(game) {
      var notifyIfListening = function(entityID,component,keyEventInfo) {

        if(component.indexOf(keyEventInfo.type) !== -1) {

          game.observer().send({
            type: keyEventInfo.type,
            entity: entityID,
            data: {
            	key: keyEventInfo.key
            }
          });

        }
      };


      return function(event) {
        Keyboard.eachComponent(notifyIfListening, {
          type: event.type,
          key: event.key
        });
      };

    })(game);

  context.addEventListener('keydown',onKeyEvent,false);
  context.addEventListener('keyup',onKeyEvent,false);

  return Keyboard;
};