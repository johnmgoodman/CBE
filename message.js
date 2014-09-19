"use strict";

/*
 * Example message structure:
 * {
 *   type: 'collision',
 *   entity: 341,
 *   data: {
 *     ...
 *   }
 * }
 */



module.exports = {
  /**
   * Message factory helper function
   * @function createMessage
   * @param {String} type - Message/event type
   * @param {Number} entity - ID of the entity associated with the message
   * @param {Object} data - Basic object containing the message data
   */
  createMessage: function(tag,entity,data) {
    return {
      tag: tag,
      entity: entity,
      data: data
    };
  }
};
 
