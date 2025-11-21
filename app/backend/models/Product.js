const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gaushalaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Gaushala', required: true },
  category: { type: String, enum: ['Milk', 'Ghee', 'Butter', 'Cheese', 'Paneer', 'Dung Cake', 'Urine Products', 'Other'], required: true },
  description: { type: String },
  price: { type: Number, required: true },
  unit: { type: String, default: 'kg' },
  stock: { type: Number, default: 0 },
  image: { type: String },
  available: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);