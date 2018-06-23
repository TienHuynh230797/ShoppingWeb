var Category = require('../models/category');
var async = require('async');
var Product = require('../models/product');

exports.categories = function (req, res, next) {
    async.parallel({
        list_categories: function (callback) {
            Category.find().exec(callback);
        },
        list_products: function (callback) {
            Product.find({"category" : req.params.id}, 'product_name type price discount_amount image').populate('type').exec(callback);
        }
    }, function (err, results) {
        if (err) {
            return next(err);
        }
        if (results.list_categories == null) {
            let err = new Error('Category not found');
            err.status = 404;
            return next(err);
        }
        if (results.list_categories == null) {
            let err = new Error('Products not found');
            err.status = 404;
            return next(err);
        }
        res.render('categories', {
            category_list: results.list_categories,
            product_list: results.list_products
        });
    });
};
