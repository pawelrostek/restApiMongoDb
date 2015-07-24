/**
 * 
 *  Model: Category
 *      TODO: need implements getting data from database
 *      
 *  @author         Paweł Rostek
 *  @description    Model of Category
 *  
 */

////var mongoose = require('mongoose');
//
//var categorySchema = new mongoose.Schema({
//  id: Number,
//  name: String,
//  active: Boolean,
//  description: String
//});
//
//module.exports = mongoose.model('Category', categorySchema);

var CategoryModel = {
 
  getAll: function(req, res) {
    var allProducts = data;
    res.json(allProducts);
  },
 
  getOne: function(req, res) {
    var id = req.params.id;
    var product = data[0];
    res.json(product);
  },
 
  create: function(req, res) {
    var newProduct = req.body;
    data.push(newProduct);
    res.json(newProduct);
  },
 
  update: function(req, res) {
    var updateProduct = req.body;
    var id = req.params.id;
    data[id] = updateProduct;
    res.json(updateProduct);
  },
 
  delete: function(req, res) {
    var id = req.params.id;
    data.splice(id, 1);
    res.json(true);
  }
};

var data = [{
  name: 'Category 1',
  id: '1'
}, {
  name: 'Category 2',
  id: '2'
}, {
  name: 'Category 3',
  id: '3'
}];
 
module.exports = CategoryModel;