var passport = require("passport");
var User = require("../models/User");

var userController = {};

// Restrict access to root page
userController.home = function(req, res) {
    res.render('layout', { user : req.user });
};

// Go to registration page
userController.register = function(req, res) {
    res.render('register');
};

// Post registration
userController.doRegister = function(req, res) {
    User.register(new User({ username : req.body.username, name: req.body.name }), req.body.password, function(err, user) {
        if (err) {
            return res.render('register', { user : user });
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
};

// Go to login page
/*userController.login = function(req, res) {
    res.render('layout');
};*/

// Post login
userController.doLogin = function(req, res) {
    passport.serializeUser(function(user, done) {
        done(null, user.username);
    });
    passport.deserializeUser(function(username, done) {
        User.find({'username': username}).then(function (user) {
            done(null, user);
        }).catch(function (err) {
            console.log(err);
        })
    });
};

// logout
userController.logout = function(req, res) {
    req.logout();
    res.redirect('/');
};

function isLoggedIn(req, res, next) {
    // Nếu một user đã xác thực, cho đi tiếp
    if (req.isAuthenticated())
        return next();
    // Nếu chưa, đưa về trang chủ
    res.redirect('/');
}

module.exports = userController;
