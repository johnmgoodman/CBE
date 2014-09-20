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





---

This project is still in its infancy. More details to come..
