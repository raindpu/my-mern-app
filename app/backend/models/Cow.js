const mongoose = require('mongoose');

const cowSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gaushalaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Gaushala', required: true },
  breed: { type: String, required: true },
  age: { type: Number },
  gender: { type: String, enum: ['Male', 'Female'], required: true },
  color: { type: String },
  healthStatus: { type: String, enum: ['Healthy', 'Under Treatment', 'Critical'], default: 'Healthy' },
  milkProduction: { type: Number, default: 0 },
  specialNeeds: { type: String },
  arrivalDate: { type: Date, default: Date.now },
  image: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Cow', cowSchema);