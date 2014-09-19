"use strict";

module.exports = (function() {

  var Game = function(engine) {
    /**
     * Reference to the Game's Game Engine
     * @property Game.__engine
     * @private
     */
    this.__engine = engine;
    
  };

  Game.prototype = {
    
    /**
     * Initialize a set of Systems
     * @method Game.systems
     * @param {Object} systems - List of the systems to initialize indexed by tags
     */
    systems: function(systems) {
      var currentTag;
      
      for(currentTag in systems) {
        if(systems.hasOwnProperty(currentTag)) {
          this.__engine.addSystem(currentTag,systems[currentTag]);
        }
      }
      return this;
    },
    
    /**
     * Initializes a set of entities
     * @method Game.entities
     * @param {Array} entities - List of entities to initialize
     */
     entities: function(entities) {
       var entI = entities.length;
       
       while(--entI >= 0) {
         this.__engine.addEntity(entities[entI]);
       }
     },

    /**
     * Sets the active obeserver and returns the Game object if an Observer is the argument. Otherwise (no args), returns the active observer. 
     * @method Game.observer
     * @param {Observer} [obs] - the observer to activate
     */
    observer: function(obs) {
      if(obs) {
        this.__engine.activeObserver = obs;
        return this;
      } else {
        return this.__engine.activeObserver;
      }
    },
     
    /**
     * Sends the update signal to the engine
     * @method Game.update
     * @param {Number} delta - Milliseconds since the game started
     */
    update: function(delta) {
      this.__engine.update(delta);
      return this;
    }
  };

  return Game;
})();
