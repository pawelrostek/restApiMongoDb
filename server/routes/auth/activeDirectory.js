/**
 * 
 * Router Authenticate using service ActiveDirectory
 * 
 *  @author         Paweł Rostek
 *  @description    This router is createt only for testing time
 *  
 */

var AD_CONFIG_JSOV = '../../config/activedirectory.json';
var SECRET_SALT_FN = '../../config/secret';

 // Dependencies
var jwt = require('jwt-simple');
var activeDirectory = require('activedirectory');
        adConfig = require(AD_CONFIG_JSOV);

var ad = new activeDirectory(adConfig.main);

var auth = {
    login: function (req, res) {

        var username = req.body.username || '';
        var password = req.body.password || '';

        if (username == '' || password == '') {
            invalidResponse(req, res, err);
            return;
        }

        ad.authenticate(username + adConfig.domainName, password, function (err, auth) {

            if (err || !auth) {
                invalidResponse(req, res, err);
            } else {
                ad.findUser(username, function (err, data) {

                    var expires = expiresIn(1); // 1 days
                    var token = jwt.encode({
                        exp: expires
                    }, require(SECRET_SALT_FN)());

                    var result = {
                        token: token,
                        expires: expires,
                        user: data
                    };

                    res.json(result);
                });
            }
            return;
        });
    },
    validate: function (username, password) {
        //TODO: get user data form Database or ActiveDirectory
        var dbUserObj = {
            name: 'pawel',
            role: 'admin',
            username: 'pawel.rostek@i-bs.pl'
        };

        return dbUserObj;
    },
    validateUser: function (username) {
        //TODO: get user data form Database or ActiveDirectory
        var dbUserObj = {
            name: 'pawel',
            role: 'admin',
            username: 'pawel.rostek@i-bs.pl'
        };

        return dbUserObj;
    },
}

function invalidResponse(req, res, err) {

    console.log('Error: ' + JSON.stringify(err));

    res.status(401);
    res.json({
        "status": 401,
        "message": "Invalid credentials"
    });
}

// private method
function genToken(user) {

    var expires = expiresIn(1); // 1 days
    var token = jwt.encode({
        exp: expires
    }, require(SECRET_SALT_FN)());

    return {
        token: token,
        expires: expires,
        user: user
    };
}
function expiresIn(numDays) {

    var dateObj = new Date();
    return dateObj.setDate(dateObj.getDate() + numDays);
}

module.exports = auth;
