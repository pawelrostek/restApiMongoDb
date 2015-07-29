/**
 * 
 *  Model: Users
 *      
 *  @author         Paweł Rostek
 *  @description    Model of Users
 *  
 */

// Dependencies
var restful = require('node-restful');
var autoIncrement = require('mongoose-auto-increment');
var mongoose = restful.mongoose;

// Model schema
var usersSchema = new mongoose.Schema({
    type_id: { type: Number, ref: 'UserTypes' },
    external_id: String,
    first_name: String,
    last_name: String,
    email: String,
    phone: Number,
    login: String,
    password: String,
    insert_time: {type: Date, default: Date.now}
});

autoIncrement.initialize(mongoose);
usersSchema.plugin(autoIncrement.plugin, 'Users');

// Return model
module.exports = restful.model('Users', usersSchema);