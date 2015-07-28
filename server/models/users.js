/**
 * 
 *  Model: Users
 *      
 *  @author         Paweł Rostek
 *  @description    Model of Users
 *  
 */

 // Dependencies
var restful = require('node-restful'),
	mongoose = restful.mongoose;

// Model schema
var usersSchema = new mongoose.Schema({
	id: Number,
	type_id: Number,
    external_id: String,
    first_name: String,
	last_name: String,
	email: String,
	phone: Number,
	login: String,
	password: String,
    insert_time: { type: Date, default: Date.now }
});

// Return model
module.exports = restful.model('Users', usersSchema);