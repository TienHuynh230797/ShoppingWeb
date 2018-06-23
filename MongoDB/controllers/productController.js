var Product = require('../models/product');
var Product_Info = require('../models/product_info');
var Customer = require('../models/customer');
var Supplier = require('../models/supplier');
var Category = require('../models/category');
var Type = require('../models/user_object');

var async = require('async');

//Display all products
exports.index = function (req, res, next) {
    async.parallel({
        list_products: function (callback) {
            Product.find().exec(callback);
        },
        list_type: function (callback) {
            Type.find().exec(callback);
        },
        list_customers: function (callback) {
            Customer.find().exec(callback);
        },
    }, function (err, results) {
        if (err) {
            return next(err);
        }
        res.render('index', {
            title: 'Home',
            product_list: results.list_products,
            type_list: results.list_type,
            customer_list: results.list_customers
        });
    });
};

exports.layout = function (req, res, next) {
    async.parallel({
        list_categories: function (callback) {
            Category.find().exec(callback);
        },
        list_customers: function (callback) {
            Customer.find().exec(callback);
        },
    }, function (err, results) {
        if (err) {
            return next(err);
        }
        if (results.list_customers == null) {
            err = new Error('Customer || Category not found');
            err.status = 404;
            return next(err);
        }
        res.render('layout', {
            title: 'Home',
            category_list: results.list_categories,
            customer_list: results.list_customers
        });
    });
};


exports.product_detail = function (req, res, next) {
    async.parallel({
        product: function (callback) {
            Product.findById(req.params.id).exec(callback);
        },
        product_info: function (callback) {
            Product_Info.find({'product': req.params.id}).exec(callback);
        },
        list_categories: function (callback) {
            Category.find().exec(callback);
        },
        list_type: function (callback) {
            Type.find().exec(callback);
        }
    }, function (err, results) {
        if (err) {
            return next(err);
        }
        res.render('info', {
            title: results.product.product_name,
            productCurrent: results.product,
            type_list: results.list_type,
            productInfo: results.product_info,
            category_list: results.list_categories
        });
    });
};