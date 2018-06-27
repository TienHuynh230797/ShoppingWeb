var Type = require('../models/user_object');
var async = require('async');
var Product = require('../models/product');
var Cart = require('../models/cart');

exports.get_list = function (req, res, next) {
    async.series({
        list_type: function (callback) {
            Type.find().exec(callback);
        },
        curType: function (callback) {
            Type.find().exec(callback);
        }
    }, function (err, results) {
        if (err) {
            return next(err);
        }
        if (results.list_type == null) {
            let err = new Error('Type not found');
            err.status = 404;
            return next(err);
        }
        if (!req.user)
        {
            if (!req.session.cart)
            {
                res.render('shopping-cart', {
                    title: 'Shopping Cart',
                    typeCurrent: results.curType,
                    type_list: results.list_type,
                    product_list: null,
                    user: req.user,
                    mess: "0"
                });
            }
            else
            {
                var cart = new Cart(req.session.cart);
                res.render('shopping-cart', {
                    title: 'Shopping Cart',
                    typeCurrent: results.curType,
                    type_list: results.list_type,
                    product_list: cart.generateArray(),
                    totalPrice: cart.totalPrice,
                    user: req.user,
                    mess: "0"
                });
            }

        } else {
            if (!req.session.cart)
            {
                res.render('shopping-cart', {
                    title: 'Shopping Cart',
                    typeCurrent: results.curType,
                    type_list: results.list_type,
                    product_list: null,
                    user: req.user,
                    mess: "10"
                });
            }
            else
            {
                var cart = new Cart(req.session.cart);
                res.render('shopping-cart', {
                    title: 'Shopping Cart',
                    typeCurrent: results.curType,
                    type_list: results.list_type,
                    product_list: cart.generateArray(),
                    totalPrice: cart.totalPrice,
                    user: req.user,
                    mess: "10"
                });
            }
        }

    });
};

exports.pay = function(req, res) {
    async.series({
        list_type: function (callback) {
            Type.find().exec(callback);
        },
        curType: function (callback) {
            Type.find().exec(callback);
        }
    }, function (err, results) {
        if (err) {
            return next(err);
        }
        if (results.list_type == null) {
            let err = new Error('Type not found');
            err.status = 404;
            return next(err);
        }
        if (!req.user)
        {
            var cart = new Cart(req.session.cart);
            res.render('shopping-cart', {
                title: 'Shopping Cart',
                typeCurrent: results.curType,
                type_list: results.list_type,
                product_list: cart.generateArray(),
                totalPrice: cart.totalPrice,
                user: req.user,
                mess: "13" //Lỗi: Chưa đăng nhập
            })
        } else {
            if (!req.session.cart)
            {
                res.render('shopping-cart', {
                    title: 'Shopping Cart',
                    typeCurrent: results.curType,
                    type_list: results.list_type,
                    product_list: null,
                    user: req.user,
                    mess: "14"  //Lỗi: Không có sản phẩm trong giỏ hàng
                });
            }
            else
            {
                res.render('delivery', {
                    title: "Thanh toán",
                    user: req.user,
                    mess: "10"
                })
            }
        }

    });
};

exports.checkoutInfoDelivery = function(req, res) {
    if (!req.body.fullname || !req.body.address || !req.body.email || !req.body.phoneNumber)
    {
        res.render('delivery', {
            title: "Thanh toán",
            user: req.user,
            mess: 11    //Lỗi: Các thông tin có dấu * không được để trống
        })
    }
}

exports.addToCart = function (req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    Product.findById(productId, function (err, product) {
        if (err) {
            return res.redirect('/');
        }
        cart.add(product, product.id);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect('/');
    })
}