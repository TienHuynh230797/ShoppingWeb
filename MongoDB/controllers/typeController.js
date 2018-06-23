var Type = require('../models/user_object');
var async = require('async');
var Product = require('../models/product');

exports.type = function (req, res, next) {
    async.series({
        list_type: function (callback) {
            Type.find().exec(callback);
        },
        list_products: function (callback) {
            Product.find({"type" : req.params.id}).exec(callback);
        },
        curType: function (callback) {
            Type.findById(req.params.id).exec(callback);
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
        res.render('type', {
            title: results.curType.name,
            typeCurrent: results.curType,
            type_list: results.list_type,
            product_list: results.list_products
        });
    });
};
