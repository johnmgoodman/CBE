"use strict";

module.exports = function(CBE,game,context) {
  var Mouse = new CBE.System(),

  notifyIfListening = function(entityID,component,data) {
    if(component.indexOf(data.type) !== -1) {
      game.observer().send({
        type: data.type,
        entity: entityID,
        data: data.info
      });
    }
  },

  onMouseActivate = function(mouseevent) {
    Mouse.eachComponent(notifyIfListening,{
      type: 'cursoractivate',
      info: {
        clientX: mouseevent.clientX,
        clientY: mouseevent.clientY,

        pageX: mouseevent.pageX,
        pageY: mouseevent.pageY
      }
    });
  };

  context.addEventListener('click',onMouseActivate);

  return Mouse;
};