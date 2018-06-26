var Product = require('../models/product');
var Product_Info = require('../models/product_info');
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
                user: req.user,
                mess: "10"
            });
        } else {
            res.render('index', {
                title: 'Home',
                product_list: results.list_products,
                type_list: results.list_type,
                mess: "0"
            });
        }
    });
};

exports.layout = function (req, res, next) {
    async.series({
        list_type: function (callback) {
            Type.find().exec(callback);
        }
    }, function (err, results) {
        if (err) {
            return next(err);
        }
        if (results.list_type == null) {
            err = new Error('Type || Category not found');
            err.status = 404;
            return next(err);
        }
        res.render('layout', {
            title: 'Home',
            type_list: results.list_type,
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
        //Test user login
        if (req.user)
        {
            res.render('info', {
                title: results.product.product_name,
                productCurrent: results.product,
                type_list: results.list_type,
                productInfo: results.product_info,
                category_list: results.list_categories,
                product_list: results.list_product,
                comment_list: results.list_comment,
                user: req.user,
                mess: "10"
            });
        } else {
            res.render('info', {
                title: results.product.product_name,
                productCurrent: results.product,
                type_list: results.list_type,
                productInfo: results.product_info,
                category_list: results.list_categories,
                product_list: results.list_product,
                comment_list: results.list_comment,
                mess: "0"
            });
        }

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
exports.search = function (req, res, next) {
    async.series({
        list_type: function (callback) {
            Type.find().exec(callback);
        },
        list_products: function (callback) {
            Product.find().exec(callback);
        },
        list_search: function (callback) {
            Product.find({'product_name' : {$regex : req.query.content}}).exec(callback);
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
            res.render('search', {
                title: req.query.content,
                type_list: results.list_type,
                product_list: results.list_products,
                search_list: results.list_search,
                user: req.user,
                mess: "10"
            });
        } else {
            res.render('search', {
                title: req.query.content,
                type_list: results.list_type,
                product_list: results.list_products,
                search_list: results.list_search,
                mess: "0"
            });
        }
    });
};
exports.advanced_search_init = function (req, res, next) {
    async.parallel({
        list_type: function (callback) {
            Type.find().exec(callback);
        },
        list_category: function (callback) {
            Category.find().exec(callback);
        },
        list_supplier: function (callback) {
            Supplier.find().exec(callback);
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
            res.render('advanced-search', {
                title: 'Advanced search',
                type_list: results.list_type,
                cagetory_list: results.list_category,
                supplier_list: result.list_supplier,
                user: req.user,
                mess: "10"
            });
        } else {
            res.render('advanced-search', {
                title: 'Advanced search',
                type_list: results.list_type,
                cagetory_list: results.list_category,
                supplier_list: result.list_supplier,
                mess: "0"
            });
        }
    });
};
exports.advanced_search = function (req, res, next) {
    async.parallel({
        list_type: function (callback) {
            Type.find().exec(callback);
        },
        list_category: function (callback) {
            Category.find().exec(callback);
        },
        list_supplier: function (callback) {
            Supplier.find().exec(callback);
        },
        list_search: function (callback) {
            Product.find({'product_name' : {$regex : req.query.content}, 'product_company': req.query.supplier, 'category': req.query.category, 'type': req.query.type, }).exec(callback);
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
            res.render('advanced-search', {
                title: 'Advanced search',
                type_list: results.list_type,
                cagetory_list: results.list_category,
                supplier_list: result.list_supplier,
                user: req.user,
                mess: "10"
            });
        } else {
            res.render('advanced-search', {
                title: 'Advanced search',
                type_list: results.list_type,
                cagetory_list: results.list_category,
                supplier_list: result.list_supplier,
                mess: "0"
            });
        }
    });
};