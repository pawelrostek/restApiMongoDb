/**
 * 
 *  Model: User Types
 *      
 *  @author         Paweł Rostek
 *  @description    Model of User Types
 *  
 */

// Dependencies
var restful = require('node-restful');
var autoIncrement = require('mongoose-auto-increment');
var mongoose = restful.mongoose;

// Model schema
var userTypesSchema = new mongoose.Schema({
    name: String,
    group: String,
    description: String,
    insert_time: {type: Date, default: Date.now}
});

autoIncrement.initialize(mongoose);
userTypesSchema.plugin(autoIncrement.plugin, 'UserTypes');

// Return model
module.exports = restful.model('UserTypes', userTypesSchema);