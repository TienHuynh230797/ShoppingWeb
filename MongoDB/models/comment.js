var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CommentSchema = new Schema(
    {
        product_id: {type: Schema.ObjectId, required: true, ref: 'Product'},
        fullname: {type: String, max: 100},
        time: {type: String, max: 10},
        subject: {type: String, max: 1024}
    });

CommentSchema.virtual('url').get(function () {
    return '/comment/' + this._id;
});

module.exports = mongoose.model('Comment', CommentSchema);
