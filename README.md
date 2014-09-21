CBE
===

Component-Based Entities


This is a small Javascript game engine using the component-based entity model. Each game-object (entity) is broken into its constituent parts (components) and these are stored for processing by independent processes (systems). Systems communicate with eachother by subscribing and publishing to certain message types via a relaying object (observer).


Entities
--------

Entities are normally thought of as objects that represent game artifacts, characters, places, etc. In CBE an entity is any data structure that is represented in one or several domains. For instance, a game can have a Bat entity that is composed of data for rendering a sprite image of a bat, data for bat-like behavior, and data for bat-related status conditions such as `isFlying` or `isHungry`. These domains (in the example: rending, behavior, and status, respectively) are completely independent of one another except for their association through entities. This allows entity data to be segmented into domain-specific fragments called 'components'. 

The CBE engine actually doesn't specify any entity psuedo-class other than that each entity is a basic object whose properties each specify a component for a domain. For our bat example:

    var bat = {
      'rendering': ['bat_sprite.png'],
      'behavior': ['aggressive','cautious'],
      'status': ['flying']
    };


Systems
-------

Systems hold most of the game code. As entities are loaded, the entity components are stored for processing in their relevant systems and how a system handles its components is up to the programmer.

A system can subscribe to a message delegator called an `Observer`. Other systems can publish messages to the observer and the observer will notify subscribed systems by pushing the message into the system's message queue.

When the system's `update()` method is called, the system iterates over its queued messages and fires off an 'action' associated with the message type:


    var healAction = function(message, component, delta) {
      component[HEALTH] += message.data.amount;
    };
    
    StatusSystem.addAction('heal',healAction);


Observers
---------

An observer is a message delegator that relays data between systems. A system may `send()` a message to an observer and if that observer contains 'subscriptions' for the message type, the observer will `notify()` the subscriber(s).

    var healMessage = {
      type: 'heal',
      entity: "4",
      data: {
        amount: 24
      }
    };

    Observer.send(healMessage);




---

This project is still in its infancy. More details to come..
