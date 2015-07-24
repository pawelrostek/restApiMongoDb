/**
 * 
 *  Model: Event Types
 *      
 *  @author         Paweł Rostek
 *  @description    Model of Event Types
 *  
 */
var restful = require('node-restful'),
	mongoose = restful.mongoose;

// Events
var eventTypesSchema = new mongoose.Schema({
	event_type_id: Number,
	event_type_name: String,
});

module.exports = restful.model('EventTypes', eventTypesSchema);