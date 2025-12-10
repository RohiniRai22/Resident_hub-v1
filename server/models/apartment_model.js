const mongoose = require('mongoose');

const apartmentSchema = new mongoose.Schema({
  name: { type: String, required: false },

  address: { type: String, required: false },
  city: { type: String, required: false },
  apartcategory: { type: mongoose.Schema.Types.ObjectId, ref: 'service', required: false },
  zipCode: { type: String, required: false },

  areaSqFt: { type: String, required: false },

  rentOrSalePrice: { type: Number, required: false },
  availabilityStatus: { 
    type: String, 
    required: false, 
    enum: ['Available', 'Occupied'], 
    default: 'Available' 
  },

  contactName: { type: String, required: false },
  contactPhone: { type: String, required: false },
  amenities: [String], 
  thumbnail: { type: String },
}, {
  timestamps: false
});

module.exports = mongoose.model('Apartment', apartmentSchema);
