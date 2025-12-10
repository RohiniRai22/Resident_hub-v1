// const mongoose = require('mongoose');

// const serviceProviderSchema = new mongoose.Schema({

//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//   },
//   phone: {
//     type: String,
//     required: true,
//   },
//   address: {
//     type: String,
//     required: true,
//   },
//   profilePicture: {
//     type: String, // URL to the profile picture

//   },
//   status: {
//     type: String,
//   },
//   password: {
//     type: String,
//   },
//   // Business Details
//   businessName: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   businessType: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref:"service",
  
//     required: true,
//   },
//   description: {
//     type: String,
//     trim: true,
//   },
//   workingHours: {
//     monday: {
//       start: {
//         type: String, // e.g., '09:00'
//       },
//       end: {
//         type: String, // e.g., '17:00'
//       },
//     },
//     tuesday: {
//       start: {
//         type: String,
//       },
//       end: {
//         type: String,
//       },
//     },
//     wednesday: {
//       start: {
//         type: String,
//       },
//       end: {
//         type: String,
//       },
//     },
//     thursday: {
//       start: {
//         type: String,
//       },
//       end: {
//         type: String,
//       },
//     },
//     friday: {
//       start: {
//         type: String,
//       },
//       end: {
//         type: String,
//       },
//     },
//     saturday: {
//       start: {
//         type: String,
//       },
//       end: {
//         type: String,
//       },
//     },
//     sunday: {
//       start: {
//         type: String,
//       },
//       end: {
//         type: String,
//       },
//     },
//   },
// },{timestamps:true});

// module.exports = mongoose.model('serviceprovider', serviceProviderSchema);



const mongoose = require('mongoose');


const serviceProviderSchema = new mongoose.Schema({
    name: { type: String},
    email: { type: String},
    phone: { type: String},
    address: { type: String},

    status: { type: String },
    password: { type: String },

    businessType: { type: mongoose.Schema.Types.ObjectId, ref: 'service'},

}, { timestamps: true });

module.exports = mongoose.model('serviceProvider', serviceProviderSchema);
