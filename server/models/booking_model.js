

const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: [/.+\@.+\..+/, 'Please enter a valid email address'],
  },
  phoneNumber: {
    type: String,
    required: [true, 'Phone number is required'],
    match: [/^\d{10}$/, 'Phone number must be 10 digits long'],
  },
  address: {
    type: String,
    required: [true, 'Phone number is required'],
    
  },
 
  status: {
    type: String,
    // enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
    enum: ['Pending', 'Confirmed', 'Cancelled', 'Paid','Completed','Vacating Soon'], 
    default: 'Pending',
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'User ID is required'],
  },
  apartmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Apartment',
    required: [true, 'Apartment is required'],
  },
  
assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'serviceProvider' },

  
  amount: { 
    type: Number, 
    required: true
  },
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);