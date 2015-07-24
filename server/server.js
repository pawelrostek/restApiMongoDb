/**
 * 
 *  Main Application
 * 
 *  @author         Paweł Rostek
 *  @description    Moduł powiadomień operatorów bankowych
 *  
 */
var express = require('express'),
        path = require('path'),
        logger = require('morgan'),
        bodyParser = require('body-parser');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());

app.all('/*', function (req, res, next) {

    // CORS headers
    res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');

    // Set custom headers for CORS
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});

// Auth Middleware - This will check if the token is valid
// Only the requests that start with /api/v1/* will be checked for the token.
app.all('/api/v1/*', [require('./middlewares/validateRequest')])
app.use('/', require('./routes'));

// If no route is matched by now, it must be a 404
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Start the server
app.set('port', process.env.PORT || 4000);

var server = app.listen(app.get('port'), function () {
    console.log('Server listening on port ' + server.address().port);
});
