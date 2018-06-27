var passport = require("passport");
var User = require("../models/User");
var bcrypt = require('bcrypt-nodejs');
var auth = require('passport-local-authenticate');

var userController = {};

// Restrict access to root page
userController.home = function(req, res) {
    res.render('layout', { user : req.user });
};

// Go to loginOK page
/*userController.loginOK = function(req, res, next) {
    if (req.user)
    {
        res.render('index', {
            mess: "10"
        });
    }
    //res.render('index');

};*/

// Go to registration page
userController.signup = function(req, res) {
    res.render('signup', {
        title: "Sign up"
    });
};

// Post registration
userController.doSignup= function(req, res) {
    if (req.body.username && req.body.name && req.body.password && req.body.passwordConfirm)
    {
        User.findOne({'username': req.body.username}, function (err, user) {
            if (user)
                return res.render('signup', {
                    mess: "1"       //Đã tồn tại user
                })
        })
        if (req.body.password != req.body.passwordConfirm)
        {
            return res.render('signup', {
                mess: "2"       //Mật khẩu nhập lại không khớp
            })
        }
        User.register(new User({ username : req.body.username, name: req.body.name}), req.body.password, function(err, user) {
            if (err) {
                return res.render('signup', {
                    user : user,
                    mess : "3"    //Error
                });
            }

            passport.authenticate('local')(req, res, function () {
                res.redirect('/');
                /*res.render('index', {
                    mess: "4"     //Login OK
                })*/

            });
        });
    }
    else {
        return res.render('signup', {
            title: "Sign up",
            mess: "5"     //Chưa điền đầy đủ thông tin
        });
    }


};

// Go to login page
/*userController.login = function(req, res) {
    res.render('layout');
};*/

// Post login
userController.doLogin = function(req, res) {
    passport.authenticate('local')(req, res, function () {
        res.redirect('/');
    });
};

// logout
userController.logout = function(req, res) {
    req.logout();
    res.redirect('/');
};

//showUserDetail
userController.showUserDetail = function (req, res) {
    return res.render('userDetail', {
        title: 'Xin chào ' + req.user.name,
        user: req.user,
        mess: "10"     //mess xác nhận hiển thị user detail
    })
};

userController.updateUserDetail =function(req, res) {
    if (req.user)
    {
        if (!req.body.name)
        {
            return res.render('userDetail', {
                title: 'Xin chào ' + req.user.name,
                user: req.user,
                mess: "11"      //Các thông tin có dấu * không được để trống
            })
        }
        else {
            User.findOne({'username': req.body.username}, function (err, userInfo) {
                if (req.body.newPassword || req.body.newPasswordConfirm)
                {
                    if (req.body.newPassword != req.body.newPasswordConfirm)
                    {
                        return res.render('userDetail', {
                            title: 'Xin chào ' + req.user.name,
                            user: req.user,
                            mess: "12"       //Lỗi: Mật khẩu mới và xác nhận mật khẩu mới không trùng khớp
                        })
                    }
                    else
                    {
                        userInfo.setPassword(req.body.newPassword, function () {
                            userInfo.name = req.body.name;
                            userInfo.save(function (err) {
                                if (err)
                                {
                                    console.log('error');
                                }
                                else
                                {
                                    res.redirect('/');
                                }
                            });
                        })
                    }
                }
                else
                {
                    userInfo.name = req.body.name;
                    userInfo.save(function (err) {
                        if (err)
                        {
                            console.log('error');
                        }
                        else
                        {
                           res.redirect('/');
                        }
                    })
                }
            })

        }
    }
};

module.exports = userController;
