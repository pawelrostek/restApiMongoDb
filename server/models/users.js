/**
 * 
 *  Model: Users
 *      
 *  @author         Paweł Rostek
 *  @description    Model of Users
 *  
 */
var restful = require('node-restful'),
	mongoose = restful.mongoose;

// Users
var usersSchema = new mongoose.Schema({
	user_id: Number,
        user_type_id: Number,
        user_external_id: String,
        first_name: String,
	last_name: String,
	login: String,
	password: String,
	uid: String,
        user_create_date: { type: Date, default: Date.now }
});

module.exports = restful.model('Users', usersSchema);