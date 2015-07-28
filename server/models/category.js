/**
 * 
 *  Model: Category
 *      
 *  @author         Paweł Rostek
 *  @description    Model of Category
 *  
 */

// Dependencies
var restful = require('node-restful'),
  mongoose = restful.mongoose;

// Model schema
var categorySchema = new mongoose.Schema({
  id: Number,
  name: String,
  description: String,
  insert_time: { type: Date, default: Date.now }
});

// Return model
module.exports = restful.model('Category', categorySchema);