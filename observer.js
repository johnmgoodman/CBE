"use strict";


/*
 * !!! Subscribers must implement notify(Message) !!!
 */


module.exports = (function() {
  var Observer = function() {
    this.__subscriptions = {};
    this.__queue = {};
  };

  Observer.prototype = {
    /**
     * Register a subscriber to a an event message type
     * @method subscribe
     * @param {Subscriber} subscriber - An object implementing the subscriber interface
     * @param {Number} msgType - The event message type to subscribe to
     */
    subscribe: function(subscriber,msgType) {
      var subscriptions = this.__subscriptions;
      if(subscriptions[msgType] instanceof Array) {
        
        subscriptions = subscriptions[msgType];
        if(subscriptions.indexOf(subscriber) === -1) {
          subscriptions.push(subscriber);
        }
        
      } else {
        
        subscriptions[msgType] = [subscriber];
        
      }
    },


    /**
     * Queues a message to be forwarded by the Observer
     * @method send
     * @param {Message} message - The message to be sent 
     */
    send: function(message) {
      var messages = this.__queue[message.type];
      if(messages instanceof Array) {
        messages.push(message);
      } else if(this.__subscriptions[message.type] instanceof Array) {
        this.__queue[message.type] = [message];
      }
    },

    /**
     * Sends all queued messages to their relevant subscribers
     * @method broadcast
     */
    broadcast: function() {
      var subscribers, msgType, sIndex, queue = this.__queue;

      for(msgType in queue) {
        if(queue.hasOwnProperty(msgType)) {
          subscribers = this.__subscriptions[msgType];
          if(subscribers instanceof Array) {
            sIndex = subscribers.length;
            while(--sIndex !== -1) {
              subscribers[sIndex].notify(queue[msgType]);
            }
          }
          delete this.__queue[msgType];
        }
      }
    }

    
    
  };

  return Observer;
})();
