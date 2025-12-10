const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  sub_service: { type: mongoose.Schema.Types.ObjectId, ref: 'SubService', required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  amenities: [String], // Adjust as necessary
  thumbnail: { type: String },
  service_provider_id: { type: mongoose.Schema.Types.ObjectId, ref: 'serviceProvider', required: true } // Reference to ServiceProvider
});

module.exports = mongoose.model('Package', packageSchema);
