var passport = require("passport");
var User = require("../models/User");

var userController = {};

// Restrict access to root page
userController.home = function(req, res) {
    res.render('layout', { user : req.user });
};

// Go to loginOK page
userController.loginOK = function(req, res) {
    res.render('loginOK');
};

// Go to registration page
userController.signup = function(req, res) {
    res.render('signup');
};

// Post registration
userController.doSignup= function(req, res) {
    if (req.body.username && req.body.name && req.body.password && req.body.passwordConfirm)
    {
        User.register(new User({ username : req.body.username, name: req.body.name}), req.body.password, function(err, user) {
            if (err) {
                return res.render('index', { user : user });
            }

            passport.authenticate('local')(req, res, function () {
                res.redirect('/loginOK');
            });
        });
    }
    else {
        //return res.render('signup', req.flash('signupMessage', 'Bạn phải điền đầy đủ thông tin'));
        return res.render('signup');
    }


};

// Go to login page
/*userController.login = function(req, res) {
    res.render('layout');
};*/

// Post login
userController.doLogin = function(req, res) {
    User.findOne({'username': req.body.username}, function (err, user) {
        if (err)
            return res.render('index', {user: user});
        if (!user || !user.validPassword(req.body.password))
            return res.redirect('loginOK');
    });

    passport.authenticate('local')(req, res, function () {
        res.redirect('/loginOK');
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
