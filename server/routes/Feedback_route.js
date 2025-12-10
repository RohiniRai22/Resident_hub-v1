const express = require('express');
const router = express.Router();
const feedbackController = require('../user_controller/feedbackController');

// Route to submit feedback
router.post('/submit', feedbackController.submitFeedback);

// Optional routes to fetch feedback
router.get('/user/:userId', feedbackController.getFeedbackByUser);
router.get('/getAllFeedbacks', feedbackController.getAllFeedbacks);
router.get('/getFeedbackCount/:serviceProviderId', feedbackController.getFeedbackCount);
router.get('/booking/:bookingId', feedbackController.getFeedbackByBooking);
router.get('/byServiceProvider/:serviceProviderId', feedbackController.getFeedbackByServiceProvider);

module.exports = router;
