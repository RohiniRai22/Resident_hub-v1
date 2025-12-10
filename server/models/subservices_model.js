// const mongoose = require('mongoose');

// const subServiceSchema = new mongoose.Schema({
//     service_id: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'service'
//     },
//     sub_service: {
//         type: String,
//         required: true
//     },
// }, { timestamps: true });

// module.exports = mongoose.model('subservice', subServiceSchema);
// correct up
const mongoose = require('mongoose');

const subServiceSchema = new mongoose.Schema({
    service_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'service', // Refers to the Service model
    },
    sub_service: {
        type: String,
        required: true,
    },
}, { timestamps: true });

// Register the SubService model
const SubService = mongoose.model('SubService', subServiceSchema);

module.exports = SubService;



// services: [
//     {
//       serviceName: {
//         type: String,
//         required: true,
//         trim: true,
//       },
//       price: {
//         type: Number,
//         required: true,
//         min: 0,
//       },
//       duration: {
//         type: Number, // Duration in minutes
//         required: true,
//       },
//       description: {
//         type: String,
//         trim: true,
//       },
//     },
//   ],