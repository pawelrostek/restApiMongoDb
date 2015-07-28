/**
 * 
 *  Model: Event Types
 *      
 *  @author         Paweł Rostek
 *  @description    Model of Event Types
 *  
 */

 // Dependencies
var restful = require('node-restful'),
	mongoose = restful.mongoose;

// Model schema
var eventTypesSchema = new mongoose.Schema({
	id: Number,
	name: String,
  	description: String,
  	insert_time: { type: Date, default: Date.now }
});

// Return model
module.exports = restful.model('EventTypes', eventTypesSchema);