// // controllers/paymentController.js
// const express = require('express');
// const router = express.Router();

// const Booking = require('../models/booking_model'); // Update with your booking model path
// const Payment = require('../models/payment_model'); // Update with your booking model path
// const mongoose = require('mongoose'); // Make sure you require mongoose
// // Function to handle payment processing
// // user_controller/paymentController.js
// // user_controller/paymentController.js
// const processPayment = async (req, res) => {
//   try {
//     const { orderId, packageId, serviceProviderId, transactionId, amount } = req.body;

//     // Validate required fields
//     if (!orderId || !packageId || !serviceProviderId || !transactionId || !amount) {
//       return res.status(400).json({ message: 'Missing required fields.' });
//     }

//     if (amount <= 0) {
//       return res.status(400).json({ message: 'Invalid amount.' });
//     }

//     // Check if the order exists
//     const order = await Booking.findById(orderId);
//     if (!order) {
//       return res.status(404).json({ message: 'Order not found.' });
//     }

//     // Create new payment record
//     const newPayment = new Payment({
//       orderId,
//       packageId,
//       serviceProviderId,
//       transactionId,
//       amount,
//     });

//     await newPayment.save();

//     // Optionally update order status to 'Paid'
//     order.status = 'Paid';
//     await order.save();

//     return res.status(200).json({ message: 'Payment processed successfully' });
//   } catch (error) {
//     console.error('Server error:', error); // Log error for debugging
//     res.status(500).json({ message: 'Error processing payment' });
//   }
// };










//   const getAllPayments = async (req, res) => {
//     try {
//       const payments = await Payment.find().populate('orderId'); // Populate orderId to get Booking details if needed
//       res.status(200).json({
//         success: true,
//         data: payments,
//       });
//     } catch (err) {
//       console.error('Error fetching payments:', err);
//       res.status(500).json({
//         success: false,
//         message: 'Server error. Unable to fetch payments.',
//       });
//     }
//   };
  
//   // Get a single payment by ID
//   const getPaymentById = async (req, res) => {
//     const { id } = req.params;
//     try {
//       const payment = await Payment.findById(id).populate('orderId');
//       if (!payment) {
//         return res.status(404).json({
//           success: false,
//           message: 'Payment not found',
//         });
//       }
//       res.status(200).json({
//         success: true,
//         data: payment,
//       });
//     } catch (err) {
//       console.error('Error fetching payment:', err);
//       res.status(500).json({
//         success: false,
//         message: 'Server error. Unable to fetch payment.',
//       });
//     }
//   };

//   const updatePaymentStatus = async (req, res) => {
//     const { id } = req.params;
//     const { paymentStatus } = req.body;
  
//     // Ensure paymentStatus is provided and is valid
//     if (!paymentStatus || !['Pending', 'Paid', 'Failed'].includes(paymentStatus)) {
//       return res.status(400).json({
//         success: false,
//         message: 'Invalid payment status.',
//       });
//     }
  
//     try {
//       const updatedPayment = await Payment.findByIdAndUpdate(
//         id,
//         { paymentStatus },
//         { new: true } // Return the updated document
//       );
  
//       if (!updatedPayment) {
//         return res.status(404).json({
//           success: false,
//           message: 'Payment not found',
//         });
//       }
  
//       res.status(200).json({
//         success: true,
//         data: updatedPayment,
//       });
//     } catch (err) {
//       console.error('Error updating payment:', err);
//       res.status(500).json({
//         success: false,
//         message: 'Server error. Unable to update payment.',
//       });
//     }
//   };
  
  


//   const getPaymentsByServiceProvider = async (req, res) => {
//     try {
//       const { serviceProviderId } = req.params;
  
//       if (!mongoose.Types.ObjectId.isValid(serviceProviderId)) {
//         return res.status(400).json({
//           success: false,
//           message: 'Invalid service provider ID',
//         });
//       }
  
//       const payments = await Payment.find({ serviceProviderId })
//         .populate('orderId')  // Populate related data
//         .populate('packageId'); // Populate related data
  
//       console.log('Payments fetched:', payments); // Log payments fetched
  
//       if (payments.length === 0) {
//         return res.status(404).json({
//           success: false,
//           message: 'No payments found for this service provider',
//         });
//       }
  
//       res.status(200).json({
//         success: true,
//         data: payments,
//       });
//     } catch (error) {
//       console.error('Error fetching payments for service provider:', error.message);
//       res.status(500).json({
//         success: false,
//         message: 'Error fetching payments for service provider',
//         error: error.message,
//       });
//     }
//   };
  
//  // user_controller/paymentController.js
 
//  const getPaymentCount = async (req, res) => {
//   const { serviceProviderId } = req.params;
//   try {
//     // Ensure the serviceProviderId is a valid ObjectId
//     if (!ObjectId.isValid(serviceProviderId)) {
//       return res.status(400).json({ message: 'Invalid Service Provider ID' });
//     }

//     // Query for count using ObjectId
//     const count = await Payment.countDocuments({ serviceProviderId: new ObjectId(serviceProviderId) });
//     res.json({ count });
//   } catch (error) {
//     console.error('Error fetching payment count:', error.message);
//     res.status(500).json({ message: 'Error fetching payment count' });
//   }
// };


// module.exports = {
//   processPayment,
//   getPaymentCount,
//   getAllPayments,
//   getPaymentById,
//   updatePaymentStatus,
//   getPaymentsByServiceProvider,
// };

  
  
  
  
  
  

// // Define the route for processing payment
// // router.post('/process', processPayment);


const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Models
const Booking = require('../models/booking_model'); // Update with your booking model path
const Payment = require('../models/payment_model'); // Update with your payment model path

// Function to handle payment processing
const processPayment = async (req, res) => {
  try {
    const { orderId, apartmentId, transactionId, amount } = req.body;

    // Validate required fields
    if (!orderId || !apartmentId || !transactionId || !amount) {
      return res.status(400).json({ message: 'Missing required fields.' });
    }

    if (amount <= 0) {
      return res.status(400).json({ message: 'Invalid amount.' });
    }

    // Check if the order exists
    const order = await Booking.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found.' });
    }

    // Create new payment record
    const newPayment = new Payment({
      orderId,
      apartmentId,
      transactionId,
      amount,
      paymentStatus: 'Paid'
    });

    await newPayment.save();

    // Optionally update order status to 'Paid'
    order.status = 'Paid';
    await order.save();

    return res.status(200).json({ message: 'Payment processed successfully', payment: newPayment });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Error processing payment' });
  }
};

// Get all payments
const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate('orderId'); // Populate orderId to get Booking details if needed
    res.status(200).json({
      success: true,
      data: payments,
    });
  } catch (err) {
    console.error('Error fetching payments:', err);
    res.status(500).json({
      success: false,
      message: 'Server error. Unable to fetch payments.',
    });
  }
};

// Get a single payment by ID
const getPaymentById = async (req, res) => {
  const { id } = req.params;
  try {
    const payment = await Payment.findById(id).populate('orderId');
    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found',
      });
    }
    res.status(200).json({
      success: true,
      data: payment,
    });
  } catch (err) {
    console.error('Error fetching payment:', err);
    res.status(500).json({
      success: false,
      message: 'Server error. Unable to fetch payment.',
    });
  }
};

// Update payment status
const updatePaymentStatus = async (req, res) => {
  const { id } = req.params;
  const { paymentStatus } = req.body;

  // Ensure paymentStatus is provided and is valid
  if (!paymentStatus || !['Pending', 'Paid', 'Failed'].includes(paymentStatus)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid payment status.',
    });
  }

  try {
    const updatedPayment = await Payment.findByIdAndUpdate(
      id,
      { paymentStatus },
      { new: true } // Return the updated document
    );u

    if (!updatedPayment) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found',
      });
    }

    res.status(200).json({
      success: true,
      data: updatedPayment,
    });
  } catch (err) {
    console.error('Error updating payment:', err);
    res.status(500).json({
      success: false,
      message: 'Server error. Unable to update payment.',
    });
  }
};

// Get payments by service provider
const getPaymentsByServiceProvider = async (req, res) => {
  try {
    const { serviceProviderId } = req.params;

    if (!ObjectId.isValid(serviceProviderId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid service provider ID',
      });
    }

    const payments = await Payment.find({ serviceProviderId: new ObjectId(serviceProviderId) })
      .populate('orderId')  // Populate related data
      .populate('packageId'); // Populate related data

    console.log('Payments fetched:', payments); // Log payments fetched

    if (payments.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No payments found for this service provider',
      });
    }

    res.status(200).json({
      success: true,
      data: payments,
    });
  } catch (error) {
    console.error('Error fetching payments for service provider:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error fetching payments for service provider',
      error: error.message,
    });
  }
};

// Get payment count
const getPaymentCount = async (req, res) => {
  const { serviceProviderId } = req.params;
  try {
    // Ensure the serviceProviderId is a valid ObjectId
    if (!ObjectId.isValid(serviceProviderId)) {
      return res.status(400).json({ message: 'Invalid Service Provider ID' });
    }

    // Query for count using ObjectId
    const count = await Payment.countDocuments({ serviceProviderId: new ObjectId(serviceProviderId) });
    res.json({ count });
  } catch (error) {
    console.error('Error fetching payment count:', error.message);
    res.status(500).json({ message: 'Error fetching payment count' });
  }
};

module.exports = {
  processPayment,
  getPaymentCount,
  getAllPayments,
  getPaymentById,
  updatePaymentStatus,
  getPaymentsByServiceProvider,
};
