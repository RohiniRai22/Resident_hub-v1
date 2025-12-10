const express = require('express');
const router = express.Router();
const bookingController = require('../user_controller/booking_controller');
const Booking = require('../models/booking_model'); // Assuming you have a Booking model defined
// Route to create a new booking
router.post('/createBooking', bookingController.createBooking);

// Route to get all bookings
router.get('/getAllBookings', bookingController.getAllBookings);
router.put('/assignprovider/:bookingId', bookingController.assignprovider);

router.get('/getBookingsByServiceProvider/:serviceProviderId', bookingController.getBookingsByServiceProvider);

// Route to get a booking by ID
router.get('/getBookingById/:id', bookingController.getBookingById);

// Route to update a booking by ID
router.put('/updateBooking/:id', bookingController.updateBooking);
// router.put('/assignserviceprovider/:id', bookingController.assignserviceprovider);

// Route to delete a booking by ID
router.delete('/deleteBooking/:id', bookingController.deleteBooking);
// router.get('/getBookingCount/:serviceProviderId', bookingController.getBookingCount);
router.get('/getBookingCount/:serviceProviderId', bookingController.getBookingCount);
router.get('/count/:serviceProviderId', bookingController.getBookingCountservice);

// Route to get bookings by user ID
router.get('/getBookingsByUserId/:userId', bookingController.getBookingsByUserId);

router.get('/total-bookings', async (req, res) => {
    try {
        const totalBookings = await Booking.countDocuments({});
        res.status(200).json({ totalBookings });
    } catch (err) {
        console.error('Error fetching total bookings:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// bookingRoutes.js or similar
router.put('/assignProvider/:id', async (req, res) => {
  try {
    const bookingId = req.params.id;
    const { serviceProviderId } = req.body;

    const updated = await Booking.findByIdAndUpdate(
      bookingId,
      { assignedTo: serviceProviderId },
      { new: true }
    );

    res.status(200).json({ message: 'Service provider assigned', data: updated });
  } catch (err) {
    res.status(500).json({ message: 'Assignment failed', error: err });
  }
});

module.exports = router;
