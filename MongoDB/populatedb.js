var async = require('async');
var Customer_Product = require('./models/customer_product');
var Product = require('./models/product');
var Product_Info = require('./models/product_info');
var Supplier = require('./models/supplier');
var Category = require('./models/category');
var User_Object = require('./models/user_object');
var Comment = require('./models/comment');

var mongoose = require('mongoose');
var mongoDB = 'mongodb://admin:admin@ds016298.mlab.com:16298/shoppingwebsitedb';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var customers_products = [];
var products = [];
var product_infos = [];
var suppliers = [];
var categories = [];
var user_objects = [];
var comments = [];

function categoryCreate(name, cb) {
    categoryDetail = {name: name};
    var category = new Category(categoryDetail);
    category.save(function (err) {
        if (err) {
            cb(err, null);
            return;
        }
        console.log('New category: ' + category);
        categories.push(category);
        cb(null, category);
    });
}

function user_objectCreate(name, cb) {
    user_objectDetail = {name: name};
    var user_object = new User_Object(user_objectDetail);
    user_object.save(function (err) {
        if (err) {
            cb(err, null);
            return;
        }
        console.log('New user object: ' + user_object);
        user_objects.push(user_object);
        cb(null, user_object);
    });
}

function supplierCreate(company_name, address, telephone, email, cb) {
    supplierDetail = {company_name: company_name, address: address, telephone: telephone, email: email};
    var supplier = new Supplier(supplierDetail);
    supplier.save(function (err) {
        if(err) {
            cb(err, null);
            return;
        }
        console.log('New supplier: ' + supplier);
        suppliers.push(supplier);
        cb(null, supplier);
    });
}


function productCreate(product_name, product_company, category, type, size_range, price, discount, discount_price, total_quantity, image, cb) {
    productDetail = {product_name: product_name, product_company: product_company, category: category, type: type, size_range: size_range, price: price, discount: discount, discount_price: discount_price, total_quantity: total_quantity, image: image};
    var product = new Product(productDetail);
    product.save(function (err) {
        if (err) {
            cb(err, null);
            return;
        }
        console.log('New product: ' + product);
        products.push(product);
        cb(null, product);
    });
}

function customers_productCreate(purchase_id, customer, product_id, quantity,price,  discount_value, dateofpurchase, cb) {
    customers_productDetail = {customer: customer, product_id: product_id, quantity: quantity, price: price,  discount_value: discount_value, dateofpurchase: dateofpurchase};
    var customers_product = new Customer_Product(customers_productDetail);
    customers_product.save(function (err) {
        if (err) {
            cb(err, null);
            return;
        }
        console.log('New customer_product: ' + customers_product);
        customers_products.push(customers_product);
        cb(null, customers_product);
    });
}

function product_infoCreate(image, product, size, quantity, color, cb) {
    product_infoDetail = {image: image, product: product, size: size, quantity: quantity, color: color  };
    var  product_info = new Product_Info(product_infoDetail);
    product_info.save(function (err) {
        if(err) {
            cb(err, null);
            return;
        }
        console.log('New product_info: ' + product_info);
        product_infos.push(product_info);
        cb(null, product_info);
    });
}
function commentCreate(product_id, fullname, time, subject, cb) {
    commentDetail = {product_id: product_id, fullname: fullname, time: time, subject: subject};
    var comment = new Comment(commentDetail);
    comment.save(function (err) {
        if (err) {
            cb(err, null);
            return;
        }
        console.log('New comment: ' + comment);
        comments.push(comment);
        cb(null, comment);
    });
}
function createComments(cb) {
    async.series([
        function (callback) {
            commentCreate(products[5], 'Tien Tran', '25/06/2018', 'Very good. I like it', callback);
        },
        function (callback) {
            commentCreate(products[5], 'Tien Tran', '24/06/2018', 'Hmmmmmmmm', callback);
        },
        function (callback) {
            commentCreate(products[5], 'Tien Tran', '23/06/2018', 'It has the best material ever', callback);
        },
        function (callback) {
            commentCreate(products[5], 'Tien Tran', '23/06/2018', 'You can buy it for your girlfriend', callback);
        },
        function (callback) {
            commentCreate(products[5], 'Tien Tran', '22/06/2018', 'Very good. I like it', callback);
        }
    ], cb);
}

function createSuppliers(cb) {
    async.series([
        function (callback) {
            supplierCreate('Zalo','District 5','0123456789','zalo@gmail.com',callback);
        }
        ],cb);
}

function createCategories(cb) {
    async.series([
        function (callback) {
            categoryCreate('Jean', callback);
         },
        function (callback) {
            categoryCreate('Shirt', callback);
        },
        function (callback) {
            categoryCreate('Dress', callback);
        },
        function (callback) {
            categoryCreate('SportWear', callback);
        },
    ], cb);
}

function createUser_Objects(cb) {
    async.series([
        function (callback) {
            user_objectCreate('Men', callback);
        },
        function (callback) {
            user_objectCreate('Women', callback);
        },
        function (callback) {
            user_objectCreate('Kid', callback);
        },
        function (callback) {
            user_objectCreate('Baby', callback);
        },
    ], cb);
}


function createProducts(cb) {
    async.series([
        function (callback) {
            productCreate('Blue T-Shirt',suppliers[0],categories[1],user_objects[1],9,1000000,10,900000,5,'/images/BlueTShirt.jpg',callback);
         },
        function (callback) {
            productCreate('Black Jean',suppliers[0],categories[0],user_objects[0],5,2000000,0,2000000,2,'/images/BlackJean.jpg',callback);
        },
        function (callback) {
            productCreate('Red T-Shirt',suppliers[0],categories[1],user_objects[1],6,2500000,10,2250000,3,'/images/RedTShirt.jpg',callback);
        },
        function (callback) {
            productCreate('Black Dress',suppliers[0],categories[2],user_objects[1],7,3000000,15,2550000,4,'/images/BlackDress.jpg',callback);
        },
        function (callback) {
            productCreate('Chelsea Kid Clothes',suppliers[0],categories[3],user_objects[2],8,1000000,10,900000,5,'/images/ChelseaKidClothes.jpg',callback);
        },
        function (callback) {
            productCreate('White Dress',suppliers[0],categories[2],user_objects[1],9,2200000,15,1870000,6,'/images/WhiteDress.jpg',callback);
        },
    ],cb);
}

function createProduct_Infos(cb) {
    async.series([
        function (callback) {
            product_infoCreate('/images/BlueTShirt.jpg',products[0],'L',5,'Blue',callback);
        },
        function (callback) {
            product_infoCreate('/images/BlackJean.jpg',products[1],'XL',5,'Black',callback);
        },
        function (callback) {
            product_infoCreate('/images/RedTShirt.jpg',products[2],'L',5,'Red',callback);
        },
        function (callback) {
            product_infoCreate('/images/BlackDress.jpg',products[3],'L',5,'Black',callback);
        },
        function (callback) {
            product_infoCreate('/images/ChelseaKidClothes.jpg',products[4],'M',5,'Blue',callback);
        },
        function (callback) {
            product_infoCreate('/images/WhiteDress.jpg',products[5],'L',5,'White',callback);
        },
        function (callback) {
            product_infoCreate('/images/NAYEON-SANTA.jpg', products[5], 'M', 5, 'Red', callback);
        }
    ],cb);
}


function createCustomers_products(cb) {
    async.series([function (callback) {
        customers_productCreate(1,customers[0],products[0],1,100000,100000,'2018-02-14',callback);}],cb);
}


async.series([
        createSuppliers,
        createCategories,
        createUser_Objects,
        createProducts,
        createProduct_Infos,
        createComments
    ],
// Optional callback
    function(err, results) {
        if (err) {
            console.log('FINAL ERR: '+err);
        }
        else {
            console.log('ShoppingDBInstances: '+ user_objects);

        }
        // All done, disconnect from database
        mongoose.connection.close();
    });

