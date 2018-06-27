var Type = require('../models/user_object');
var async = require('async');
var Product = require('../models/product');

exports.get_list = function (req, res, next) {
    async.series({
        list_type: function (callback) {
            Type.find().exec(callback);
        },
        list_products: function (callback) {
            Product.find().exec(callback);
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
        if (results.list_products == null) {
            let err = new Error('Products not found');
            err.status = 404;
            return next(err);
        }
        if (req.user)
        {
            res.render('type', {
                title: 'Shopping Cart',
                typeCurrent: results.curType,
                type_list: results.list_type,
                product_list: results.list_products,
                user: req.user,
                mess: "10"
            });
        } else {
            res.render('shopping-cart', {
                title: 'Shopping Cart',
                typeCurrent: results.curType,
                type_list: results.list_type,
                product_list: results.list_products,
                mess: "0"
            });
        }

    });
};
