var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ProductSchema = new Schema(
    {
        product_id: {type: Number, required: true, unique: true},
        product_name: {type: String, required: true, max: 100},
        product_company: {type: String, required: true, max: 100},
        category: {type: String},
        type: {
            type: String,
            enum: ['Women', 'Men', 'Kids', 'Babies']
        },
        size_range: {type: String, max: 10},
        price: {type: Number, required: true},
        discount: {type: Boolean, required: true},
        discount_amount: {type: Number},
        total_quantity: {type: Number}
    });

module.exports = mongoose.model('Product', ProductSchema);
