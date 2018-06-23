var Product = require('../models/product');
var Product_Info = require('../models/product_info');
var Customer = require('../models/customer');
var Customer_Product = require('../models/customer_product');
var Supplier = require('../models/supplier');
var Category = require('../models/category');
var User_Object = require('../models/user_object');

var async = require('async');

//Display all products
exports.index = function (req, res, next) {
    async.parallel({
        list_products: function (callback) {
            Product.find({}, 'product_name type price discount_amount image').populate('type').exec(callback);
        },
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
        if (results.list_products == null) {
            var err = new Error('Product || Category not found');
            err.status = 404;
            return next(err);
        }
        res.render('index', {
            title: 'Home',
            product_list: results.list_products,
            category_list: results.list_categories,
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
            var err = new Error('Customer || Category not found');
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
            Product.findById(req.params.id).populate('type').populate('category').populate('product_company').exec(callback);
        },
        product_info: function (callback) {
            Product_Info.find({'product': req.params.id}).exec(callback);
        },
        list_categories: function (callback) {
            Category.find().exec(callback);
        },
    }, function (err, results) {
        if (err) {
            return next(err);
        }
        if (results.product == null) {
            var err = new Error('Product not found');
            err.status = 404;
            return next(err);
        }
        res.render('info', {
            title: results.product.product_name,
            product: results.product,
            productInfo: results.product_info,
            category_list: results.list_categories
        });
    });
};