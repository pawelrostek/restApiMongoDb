/**
 * 
 *  Model: Events
 *      
 *  @author         Paweł Rostek
 *  @description    Model of Events
 *  
 */
var restful = require('node-restful'),
	mongoose = restful.mongoose;

// Events
var eventsSchema = new mongoose.Schema({
	event_id: Number,
	event_type_id: Number,
        event_date: { type: Date, default: Date.now }
});

module.exports = restful.model('Events', eventsSchema);