var Product = require('../models/product');
var Product_Info = require('../models/product_info');
var Customer = require('../models/customer');
var Supplier = require('../models/supplier');
var Category = require('../models/category');
var Type = require('../models/user_object');
var Comment = require('../models/comment');

var async = require('async');
var moment = require('moment');

//Display all products
exports.index = function (req, res, next) {
    async.parallel({
        list_products: function (callback) {
            Product.find().limit(6).exec(callback);
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
        //Test user login
        if (req.user)
        {
            res.render('index', {
                title: 'Home',
                product_list: results.list_products,
                type_list: results.list_type,
                customer_list: results.list_customers,
                user: user,
                mess: "10"
            });
        } else {
            res.render('index', {
                title: 'Home',
                product_list: results.list_products,
                type_list: results.list_type,
                customer_list: results.list_customers,
                mess: "0"
            });
        }
    });
};

exports.layout = function (req, res, next) {
    async.parallel({
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
        if (results.list_customers == null) {
            err = new Error('Customer || Category not found');
            err.status = 404;
            return next(err);
        }
        res.render('layout', {
            title: 'Home',
            type_list: results.list_type,
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
        },
        list_product: function (callback) {
            Product.find().exec(callback);
        },
        list_comment: function (callback) {
            Comment.find({'product_id': req.params.id}).exec(callback);
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
            category_list: results.list_categories,
            product_list: results.list_product,
            comment_list: results.list_comment
        });
    });
};
exports.postComment = function (req, res, next) {
    var date = moment(new Date()).format('DD/MM/YYYY');
    commentDetail = {product_id: req.params.id, fullname: req.body.fullname, time: date, subject: req.body.subject};
    var comment = new Comment(commentDetail);
    comment.save(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/product/' + req.params.id);
    });
};