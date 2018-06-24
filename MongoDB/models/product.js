var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ProductSchema = new Schema(
    {
        product_id: {type: Number, required: true, unique: true},
        product_name: {type: String, max: 100},
        product_company: {type: Schema.ObjectId, ref:'Supplier', max: 100},
        category: {type: Schema.ObjectId, ref:'Category'},
        type: {type: Schema.ObjectId, ref: 'User_Object'},
        size_range: {type: String, max: 10},
        price: {type: Number, required: true},
        discount: {type: Number, required: true},
        discount_price: {type: Number},
        total_quantity: {type: Number},
        image: {type: String}
    });

ProductSchema.virtual('url').get(function () {
    return '/product/' + this._id;
});

module.exports = mongoose.model('Product', ProductSchema);
