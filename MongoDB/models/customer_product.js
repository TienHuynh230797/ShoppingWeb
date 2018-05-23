var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var customer_productSchema = new Schema({
    purchase_id: {type: Number, required: true, unique: true},
    customer: {type: Schema.ObjectId,ref: 'Customer'},
    product: {type: Schema.ObjectId, ref: 'Product'},
    quantity: {type: Number, min: 0},
    price: {type: Number, required: true},
    discount_value: {type: Number},
    dateofpurchase: {type: Date}
});
module.exports = mongoose.model('Customer_Product', customer_productSchema );