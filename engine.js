"use strict";

module.exports = (function(){
  var entityInc = 0,
    systems = {},
    Engine = {

      /**
       * Parse entity data and store its components into their respective systems
       *  - Assigns the entity ID
       *  - Ignores unrecognized system tags
       * @method Engine.addEntity
       * @param {Object} entityData - The data entity data structure
       */
      addEntity: function(entityData) {
        var entityId = entityInc++,
        tag;
        
        
        for(tag in systems) {
          if(systems.hasOwnProperty(tag) && entityData.hasOwnProperty(tag)) {
            systems[tag].addComponent(entityId,entityData[tag]);
          }
        }
        return Engine;

      },


      /**
       * Add a system to the engine
       * @method Engine.addSystem
       * @param {String} tag - The identifying tag for the system. Using a non-unique tag overwrites the previous system
       * @param {System} system - The system to add
       */
      addSystem: function(tag,system) {
        systems[tag] = system;
        //systemCount += 1;
        return Engine;
      },

      /**
       * The Observer used by the engine
       * @property {Observer} activeObserver
       */
      activeObserver: null,

      /**
       * Update all of the systems
       * @method Engine.update
       * @param {Number} delta - Milliseconds since the game started
       */
      update: function(delta) {
        var tag, system, observer = Engine.activeObserver;
  
        for(tag in systems) {
          if(systems.hasOwnProperty(tag)) {
            systems[tag].update(delta);
            observer.broadcast();
          }
        }

        return Engine;
      }

    };
  return Engine;
})();
