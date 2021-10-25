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

ProductSchema
    .path('availableQuantity')
    .validate((availableQuantity) => availableQuantity > 0, 'The available quantity must be greater than 0');

ProductSchema
    .path('price')
    .validate((price) => price >= 0, 'The price cannot be negative value');

module.exports = mongoose.model('Product', ProductSchema);