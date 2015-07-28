/**
 * 
 *  Main Application Router
 * 
 *  @author         Paweł Rostek
 *  @description    Main application router
 *  
 */

 // Dependencies
var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();
var authModule = require('./auth/activeDirectory');

// DATABASE
mongoose.connect('mongodb://localhost/notifies', function (err, db) {
    if (err) {
        router.get('/', function (req, res) {
            res.send("No connect to DB - EXIT");
            module.exports = router;
        });
        return console.dir(err);
    }
});


/*
 * Routes that can be accessed by any one
 */
router.post('/auth', authModule.login);

/*
 * Routes that can be accessed only by autheticated users
 */
// Model Users
var UsersModel = require('../models/users');
    UsersModel.methods(['get', 'post', 'put', 'delete']);
    UsersModel.register(router, '/api/v1/users');

// Model Events
var EventsModel = require('../models/events');
    EventsModel.methods(['get', 'put', 'post', 'delete']);
    EventsModel.register(router, '/api/v1/events');

// Model EventTypes
var EventTypesModel = require('../models/eventTypes');
    EventTypesModel.methods(['get', 'post', 'put', 'delete']);
    EventTypesModel.register(router, '/api/v1/eventTypes');

// Model EventTypes
var CategoryModel = require('../models/category');
    CategoryModel.methods(['get', 'post', 'put', 'delete']);
    CategoryModel.register(router, '/api/v1/category');


module.exports = router;