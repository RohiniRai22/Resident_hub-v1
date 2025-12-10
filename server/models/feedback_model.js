// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const feedbackSchema = new Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User', // Referencing the User model
//     required: true
//   },
//   bookingId: { 
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Booking', // Referencing the Booking model
//     required: true
//   },
//   name: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   email: {
//     type: String,
//     required: true,
//     trim: true,
//     match: [/^\S+@\S+\.\S+$/, 'Invalid email address'] // Email validation
//   },
//   message: {
//     type: String,
//     required: true,
//     minlength: 10 // Minimum message length validation
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// }, { timestamps: true });

// module.exports = mongoose.model('Feedback', feedbackSchema);


const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// 
const feedbackSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  bookingId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
    required: true
  },
  serviceProviderId: { // New field added
    type: mongoose.Schema.Types.ObjectId,
    ref: 'serviceProvider',
    required: true
  },
  
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Invalid email address']
  },
  message: {
    type: String,
    required: true,
    minlength: 10
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('Feedback', feedbackSchema);
