var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var customer_productSchema = new Schema({
    purchase_id: {type: Number, required: true},
    customer_id: {type: Number, required: true},
    product_id: {type: Number, required: true},
    quantity: {type: Number},
    price: {type: Number, required: true},
    discount_value: {type: Number},
    dateofpurchase: {type: Date},
});
var customer_product = mongoose.model('SomeModel', customer_productSchema );