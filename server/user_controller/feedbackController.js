const Feedback = require('../models/feedback_model');
const Booking = require('../models/booking_model');
const user = require('../models/customer_model');
const serviceprovider = require('../models/service_provider_model');
const mongoose = require('mongoose');


// Submit feedback
exports.submitFeedback = async (req, res) => {
  try {
    // const { userId, orderId, serviceProviderId, name, email, message } = req.body;
const { userId, bookingId, serviceProviderId, name, email, message } = req.body;

    // Validate all fields
    if (!userId || !bookingId || !serviceProviderId || !name || !email || !message) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

   const feedback = new Feedback({
  userId,
  bookingId, // changed from orderId to bookingId
  serviceProviderId,
  name,
  email,
  message
});

    await feedback.save();

    res.status(201).json({ success: true, message: 'Feedback submitted successfully' });
  } catch (error) {
    console.error('Error saving feedback:', error);
    res.status(500).json({ success: false, message: 'Error saving feedback', error });
  }
};





// Get feedback by userId
exports.getFeedbackByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const feedbacks = await Feedback.find({ userId }).populate('bookingId');
    if (!feedbacks.length) {
      return res.status(404).json({ message: 'No feedback found for this user' });
    }

    return res.status(200).json(feedbacks);
  } catch (error) {
    console.error('Error fetching feedback:', error);
    return res.status(500).json({ error: 'Server error. Could not fetch feedback.' });
  }
};

// Get feedback by bookingId
exports.getFeedbackByBooking = async (req, res) => {
  const { bookingId } = req.params;

  try {
    const feedbacks = await Feedback.find({ bookingId }).populate('userId');
    if (!feedbacks.length) {
      return res.status(404).json({ message: 'No feedback found for this booking' });
    }

    return res.status(200).json(feedbacks);
  } catch (error) {
    console.error('Error fetching feedback:', error);
    return res.status(500).json({ error: 'Server error. Could not fetch feedback.' });
  }
};


// Get feedback by service provider ID
exports.getFeedbackByServiceProvider = async (req, res) => {
  const { serviceProviderId } = req.params;
  console.log('Fetching feedback for serviceProviderId:', serviceProviderId);

  try {
    const feedbacks = await Feedback.find({ serviceProviderId }).populate('userId');
    console.log('Feedback found:', feedbacks); // Log to see if feedback is being fetched

    if (!feedbacks.length) {
      return res.status(404).json({ message: 'No feedback found for this service provider' });
    }

    return res.status(200).json(feedbacks);
  } catch (error) {
    console.error('Error fetching feedback:', error);
    return res.status(500).json({ error: 'Server error. Could not fetch feedback.' });
  }
};



exports.getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find()
      .populate('userId', 'name email')
      .populate('serviceProviderId', 'name') // Ensure this field matches your schema
      .sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (error) {
    console.error('Error fetching feedbacks:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
exports.getFeedbackCount = async (req, res) => {
  const { serviceProviderId } = req.params;

  try {
    // Validate if serviceProviderId is used to user that need to have a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(serviceProviderId)) {
      console.error('Invalid service provider ID:', serviceProviderId);
      return res.status(400).json({ message: 'Invalid service provider ID' });
    }

    // Convert serviceProviderId to ObjectId
    const objectId = new mongoose.Types.ObjectId(serviceProviderId);

    // Log to verify the objectId
    console.log('Converted ObjectId:', objectId);

    // Query the count of feedbacks for the given service provider
    const feedbackCount = await Feedback.countDocuments({ serviceProviderId: objectId });

    // Log the feedback count to debug
    console.log('Feedback Count:', feedbackCount);

    // Send the count in the response
    res.json({ count: feedbackCount });
  } catch (error) {
    console.error('Error fetching feedback count:', error.message);
    res.status(500).json({ message: 'Error fetching feedback count', error: error.message });
  }
};