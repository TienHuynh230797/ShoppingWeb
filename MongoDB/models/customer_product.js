var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var customer_productSchema = new Schema({
    purchase_id: {type: Number, required: true, unique: true},
    customer_id: {type: Number, required: true},
    product_id: {type: Number, required: true},
    quantity: {type: Number, min: 0},
    price: {type: Number, required: true},
    discount_value: {type: Number},
    dateofpurchase: {
        type: Date/*,
        validate: {
            validate: function (value) {
                return /\d{2}-\d{2}-\d{4}/.test(value);
            },
            message: '{VALUE} is not a valid date of purchase '
        },
    */}
});
var customer_product = mongoose.model('Customer_Product', customer_productSchema );