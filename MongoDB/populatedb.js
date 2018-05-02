var async = require('async');
var Customer = require('./models/customer');
var Customer_Product = require('./models/customer_product');
var Product = require('./models/product');
var Product_Info = require('./models/product_info');
var Supplier = require('./models/supplier');

var mongoose = require('mongoose');
var mongoDB = 'mongodb://localhost:27017/shoppingDB';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var customers = [];
var customers_products = [];
var products = [];
var product_infos = [];
var suppliers = [];

function productCreate(product_id, product_name, product_company, category, type, size_range, price, discount, discount_amount, total_quantity) {
    productDetail = {product_id: product_id, product_name: product_name, product_company: product_company, category: category, type: type, size_range: size_range, price: price, discount: discount, discount_amount: discount_amount, total_quantity: total_quantity}
    var product = new Product(productDetail);
    product.save(function (err) {
        if (err) {
            return;
        }
        console.log('New product: ' + product);
        products.push(product);

    });
}
function customerCreate(id_number, firstName, lastName, birthDay, address, telephone, email) {
    customerDetail = {id_number: id_number, firstName: firstName, lastName: lastName, birthDay: birthDay, address: address, telephone: telephone, email: email}
    var customer = new Customer(customerDetail);
    customer.save(function (err) {
        if (err) {
            return;
        }
        console.log('New customer: ' + customer);
        customers.push(customer)
    })
}

function customers_productsCreate() {

}