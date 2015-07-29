/**
 * 
 *  Model: Events
 *      
 *  @author         Paweł Rostek
 *  @description    Model of Events
 *  
 */

// Dependencies
var restful = require('node-restful');
var autoIncrement = require('mongoose-auto-increment');
var mongoose = restful.mongoose;

// Model schema
var eventsSchema = new mongoose.Schema({
    type_id: { type: Number, ref: 'EventTypes' },
    content: String,
    insert_time: {type: Date, default: Date.now}
});

autoIncrement.initialize(mongoose);
eventsSchema.plugin(autoIncrement.plugin, 'Events');

// Return model
module.exports = restful.model('Events', eventsSchema);