/**
 * 
 *  Model: Category
 *      
 *  @author         Paweł Rostek
 *  @description    Model of Category
 *  
 */

// Dependencies
var restful = require('node-restful');
var autoIncrement = require('mongoose-auto-increment');
var mongoose = restful.mongoose;

// Model schema
var categorySchema = new mongoose.Schema({
    name: String,
    description: String,
    insert_time: {type: Date, default: Date.now}
});

autoIncrement.initialize(mongoose);
categorySchema.plugin(autoIncrement.plugin, 'Category');

// Return model
module.exports = restful.model('Category', categorySchema);