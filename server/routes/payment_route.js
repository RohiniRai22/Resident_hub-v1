// const express = require('express');
// const router = express.Router();
// const PaymentController = require('../user_controller/paymentController');

// // Route to process payment
// router.post('/process', PaymentController.processPayment);

// module.exports = router;


const express = require('express');
const router = express.Router();
const paymentController = require('../user_controller/paymentController');
const { getAllPayments,getPaymentById,processPayment, getPaymentsByServiceProvider, updatePaymentStatus, getPaymentCount } = require('../user_controller/paymentController'); // Import package controller methods

// Get all payments
router.get('/getAllPayments', getAllPayments);

// Get a specific payment by ID
router.get('/:id',getPaymentById);

// Create a new payment
router.post('/process', processPayment);
router.get('/getPaymentsByServiceProvider/:serviceProviderId', getPaymentsByServiceProvider);

// Update payment status
router.put('/update/:id', updatePaymentStatus);
router.get('/getPaymentCount/:serviceProviderId', getPaymentCount);
module.exports = router;
