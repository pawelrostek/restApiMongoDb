/**
 * 
 *  Model: Events
 *      
 *  @author         Paweł Rostek
 *  @description    Model of Events
 *  
 */

// Dependencies
var restful = require('node-restful'),
	mongoose = restful.mongoose;

// Model schema
var eventsSchema = new mongoose.Schema({
	id: Number,
	type_id: Number,
	data: String,
    insert_time: { type: Date, default: Date.now }
});

// Return model
module.exports = restful.model('Events', eventsSchema);