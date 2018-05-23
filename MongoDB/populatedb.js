var async = require('async');
var Customer = require('./models/customer');
var Customer_Product = require('./models/customer_product');
var Product = require('./models/product');
var Product_Info = require('./models/product_info');
var Supplier = require('./models/supplier');
var Category = require('./models/category');
var User_Object = require('./models/user_object');

var mongoose = require('mongoose');
var mongoDB = 'mongodb://admin:admin@ds016298.mlab.com:16298/shoppingwebsitedb';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var customers = [];
var customers_products = [];
var products = [];
var product_infos = [];
var suppliers = [];
var categories = [];
var user_objects = [];

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

function supplierCreate(company_id, company_name, address, telephone, email, cb) {
    supplierDetail = {company_id: company_id, company_name: company_name, address: address, telephone: telephone, email: email};
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

function customerCreate(id_number, username, password, firstName, lastName, birthDay, address, telephone, email, position, cb) {
    customerDetail = {id_number: id_number, username: username, password: password, firstName: firstName, lastName: lastName, birthDay: birthDay, address: address, telephone: telephone, email: email, position: position}
    var customer = new Customer(customerDetail);
    customer.save(function (err) {
        if (err) {
            cb(err, null);
            return;
        }
        console.log('New customer: ' + customer);
        customers.push(customer);
        cb(null, customer);
    });
}


function productCreate(product_id, product_name, product_company, category, type, size_range, price, discount, discount_amount, total_quantity, cb) {
    productDetail = {product_id: product_id, product_name: product_name, product_company: product_company, category: category, type: type, size_range: size_range, price: price, discount: discount, discount_amount: discount_amount, total_quantity: total_quantity}
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
    customers_productDetail = {purchase_id: purchase_id, customer: customer, product_id: product_id, quantity: quantity, price: price,  discount_value: discount_value, dateofpurchase: dateofpurchase}
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

function product_infoCreate(id, image, product, size, quantity, color, cb) {
    product_infoDetail = {id: id, image: image, product: product, size: size, quantity: quantity, color: color  };
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


function createCustomers(cb) {
    async.parallel([
        function (callback) {
            customerCreate(1,'admin','admin','Huynh','Tien','1997-07-23','123 NVC','0123456789','htht@gmail.com', 'admin', callback);
        },
        function (callback) {
            customerCreate(2, 'tien', '123', 'Tran','Tien','1997-01-03','123 NVC','0123456789','tien@gmail.com','customer', callback);
        },
        function (callback) {
            customerCreate(3,'an','123','Nguyen','An','1997-01-05','123 NVC','0123456789','an@gmail.com','customer', callback);
        },
    ], cb);
}

function createSuppliers(cb) {
    async.parallel([
        function (callback) {
            supplierCreate(1,'Zalo','District 5','0123456789','zalo@gmail.com',callback);
        }
        ],cb);
}

function createCategories(cb) {
    async.parallel([
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
    async.parallel([
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
    async.parallel([
        function (callback) {
            productCreate(1,'Blue T-Shirt',suppliers[0],categories[1],user_objects[1],9,1000000,true,10,5,callback);
         },
        function (callback) {
            productCreate(2,'Black Jean',suppliers[0],categories[0],user_objects[0],5,2000000,true,0,2,callback);
        },
        function (callback) {
            productCreate(3,'Red T-Shirt',suppliers[0],categories[1],user_objects[1],6,2500000,true,10,3,callback);
        },
        function (callback) {
            productCreate(4,'Black Dress',suppliers[0],categories[2],user_objects[1],7,3000000,true,15,4,callback);
        },
        function (callback) {
            productCreate(5,'Chelsea Kid Clothes',suppliers[0],categories[3],user_objects[2],8,1000000,true,10,5,callback);
        },
        function (callback) {
            productCreate(6,'White Dress',suppliers[0],categories[2],user_objects[1],9,2200000,true,15,6,callback);
        },
    ],cb);
}

function createProduct_Infos(cb) {
    async.parallel([
        function (callback) {

            product_infoCreate(1,'images/BlueTShirt.jpg',products[0],'L',5,'Blue',callback);
        },
        function (callback) {
            product_infoCreate(2,'images/BlackJean.jpg',products[1],'XL',5,'Black',callback);
        },
        function (callback) {
            product_infoCreate(3,'images/RedTShirt.jpg',products[2],'L',5,'Red',callback);
        },
        function (callback) {
            product_infoCreate(4,'images/BlackDress.jpg',products[3],'L',5,'Black',callback);
        },
        function (callback) {
            product_infoCreate(5,'images/ChelseaKidClothes.jpg',products[4],'M',5,'Blue',callback);
        },
        function (callback) {
            product_infoCreate(6,'images/WhiteDress.jpg',products[5],'L',5,'White',callback);
        },
    ],cb);
}


function createCustomers_products(cb) {
    async.parallel([function (callback) {
        customers_productCreate(1,customers[0],products[0],1,100000,100000,'2018-02-14',callback);}],cb);
}


async.series([
        createCustomers,
        createSuppliers,
        createCategories,
        createUser_Objects,
        createProducts,
        createProduct_Infos,
        createCustomers_products
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

