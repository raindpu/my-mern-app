const mongoose = require('mongoose');

const gaushalaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String },
  contactNumber: { type: String },
  email: { type: String },
  establishedYear: { type: Number },
  totalCows: { type: Number, default: 0 },
  image: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Gaushala', gaushalaSchema);