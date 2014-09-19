"use strict";

module.exports = (function() {
  var System = function() {
      /**
       * Collection of components indexed by entity ID 
       * @property System.__components
       * @private
       */
      this.__components = {};

      /**
       * The system's event message queue
       * @property System.__messageQueue
       * @private
       */
       this.__messageQueue = [];


      /**
       * The systems event responses
       * @property System.__actions
       * @private
       */
       this.__actions = {};
    };

  System.prototype = {
    /**
     * Stores system-specific entity data to the System
     * @method System.addComponent
     * @param {Number} entityId - Unique identifier for the entity that owns the component
     * @param {Array} data - system component data
     */
    addComponent: function(entityId,data) {
      this.__components[entityId] = data.slice();
      return this;
    },

    /**
     * Removes the component for the specified entity from the system
     * @method System.removeComponent
     * @param {Number} entityId - Unique identifier for the entity that owns the component
     */
    removeComponent: function(entityId) {
      delete this.__components[entityId];
      return this;
    },

    /**
     * Iterate over the system's components
     * @method System.eachComponent
     * @param {Function} callback - The function to execute with the component as the first parameter and the data as the second parameter.
     * @param {*} data - any data structure to pass to the callback function as the second parameter
     */
    eachComponent: function(callback,data) {
      var entityID, component;
      for(entityID in this.__components) {
        if(this.__components.hasOwnProperty(entityID)) {
          callback(entityID,this.__components[entityID],data);
        }
      }
    },

    /**
     * Inserts messages into the queue
     * @method System.notify
     * @param {Array} messages - array of messages to add to the queue
     */
    notify: function(messages) {
      this.__messageQueue = this.__messageQueue.concat(messages)
    },

    /**
     * Adds a message response action to the system. Non-unique types are overwritten.
     * @method System.addAction
     * @param {String} type - the message type
     * @param {Function} action - the action function with the parameter sequence message, component, delta
     */
    addAction: function(type,action) {
      this.__actions[type] = action;
    },

    /**
     * Deletes a message response action.
     * @method System.remAction
     * @param {String} type - the message type
     */
    remAction: function(type) {
      delete this.__actions[type];
    },

    /**
     * Executes the system update.
     * @method System.update
     * @param {Number} delta
     */
    update: function(delta) {
      var mIndex = this.__messageQueue.length,
      message, action;

      while(--mIndex >= 0) {
        message = this.__messageQueue[mIndex];
        action = this.__actions[message.type];
        if(typeof action !== "undefined") {
          action(message,this.__components[message.entity],delta);
        }
        
        this.__messageQueue.splice(mIndex,1);
      }
    }
  };

  return System;
})();
