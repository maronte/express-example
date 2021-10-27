/**
 *  Product model
 */

const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductSchema = new Schema({
    name: { type: String, uppercase: true, required: true },
    availableQuantity: { type: Number, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String },
    slug: { type:String, trim: true }
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);