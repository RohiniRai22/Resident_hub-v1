const Booking = require('../models/booking_model');
const Apartment = require('../models/apartment_model');
const mongoose = require('mongoose');

const ServiceProvider = require('../models/service_provider_model');

// Create a new booking
exports.createBooking = async (req, res) => {
  try {
    const { userId, apartmentId, amount, ...rest } = req.body;

    // Validate required fields (optional but recommended)
    if (!userId || !apartmentId || !amount) {
      return res.status(400).json({ message: 'userId, apartmentId, and amount are required.' });
    }

    const newBooking = new Booking({
      userId,
      apartmentId,
      amount,
      ...rest
    });

    await newBooking.save();
    res.status(201).json({ message: 'Booking created successfully' });

  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ message: 'Server error' });
  }
};








// Get all bookings
// Example backend controller logic to filter bookings by serviceProviderId
exports.getAllBookings = async (req, res) => {
 

  try {
    const bookings = await Booking.find().populate('assignedTo')
     .populate('apartmentId');  // this fills in the full provider object
    res.status(200).json({ data: bookings });
  } catch (err) {
    res.status(500).json({ message: "Error fetching bookings", error: err.message });
  }
};


// Get a single booking by ID
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    res.status(200).json({ success: true, data: booking });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
// Get bookings by service provider ID
// Get all bookings assigned to a specific service provider
exports.getBookingsByServiceProvider = async (req, res) => {
  try {
    const { serviceProviderId } = req.params;

    const bookings = await Booking.find({ assignedTo: serviceProviderId })
      .populate('apartmentId')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};





// Update a booking by ID
// exports.updateBooking = async (req, res) => {
//   try {
//     const { status, serviceDate, serviceTime } = req.body;

//     const booking = await Booking.findById(req.params.id);
//     if (!booking) {
//       return res.status(404).json({ success: false, message: 'Booking not found' });
//     }

//     if (status) booking.status = status;
//     if (serviceDate) booking.serviceDate = serviceDate;
//     if (serviceTime) booking.serviceTime = serviceTime;

//     booking.updatedAt = Date.now();

//     await booking.save();
//     res.status(200).json({ success: true, data: booking });
//   } catch (error) {
//     res.status(400).json({ success: false, error: error.message });
//   }
// };
exports.updateBooking = async (req, res) => {
  try {
    const { status, serviceDate, serviceTime } = req.body;

    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    // Update fields
    if (status) booking.status = status;
    if (serviceDate) booking.serviceDate = serviceDate;
    if (serviceTime) booking.serviceTime = serviceTime;

    booking.updatedAt = Date.now();

    // Save the booking first
    await booking.save();

    // If status is confirmed, update apartment availability
    if (status === 'Confirmed') {
      await Apartment.findByIdAndUpdate(
        booking.apartmentId,
        { availabilityStatus: 'Occupied' },
        { new: true }
      );
    }
    if (status === 'Vacating Soon') {
      await Apartment.findByIdAndUpdate(
        booking.apartmentId,
        { availabilityStatus: 'Available' },
        { new: true }
      );

    }
    res.status(200).json({ success: true, data: booking });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Delete a booking by ID
exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    res.status(200).json({ success: true, message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Get bookings by user ID
exports.getBookingsByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!userId) {
      return res.status(400).json({ success: false, message: 'User ID is required' });
    }

    const bookings = await Booking.find({ userId });
    res.status(200).json({ success: true, data: bookings });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};


exports.getBookingCount = async (req, res) => {
  const { serviceProviderId } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(serviceProviderId)) {
      return res.status(400).json({ message: 'Invalid service provider ID' });
    }

    console.log('Service Provider ID:', serviceProviderId);

    const count = await Booking.countDocuments({ assignedTo: serviceProviderId });

    console.log('Booking Count:', count);

    res.json({ count });
  } catch (error) {
    console.error('Error fetching booking count:', error.message);
    res.status(500).json({ message: 'Error fetching booking count' });
  }
};





// exports.assignserviceprovider = async (req, res) => {
//   try {
//     const bookingId = req.params.id;

//     // Find an available provider (you can add logic like .findOne({status: 'available'}) later)
//     const availableProvider = await ServiceProvider.findOne({status: 'Confirmed'});
//     if (!availableProvider) {
//       return res.status(404).json({ message: 'No available service providers' });
//     }

//     const updatedBooking = await Booking.findByIdAndUpdate(
//       bookingId,
//       { serviceProvider: availableProvider._id },
//       { new: true }
//     );

//     res.status(200).json({ message: 'Service provider assigned successfully', data: updatedBooking });
//   } catch (error) {
//     console.error('Error assigning service provider:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

exports.assignprovider = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const updateData = req.body;

    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      updateData,
      { new: true } // Return the updated document
    )
      .populate("userId", "name email")
      .populate("apartmentId")
      .populate("assignedTo", 'name');

    if (!updatedBooking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    res.status(200).json({ success: true, data: updatedBooking });
  } catch (error) {
    console.error("Error updating booking:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.getBookingCountservice = async (req, res) => {
  try {
    const { serviceProviderId } = req.params;

    const count = await Booking.countDocuments({
      assignedTo: serviceProviderId,
      status: { $ne: 'Completed' } // Exclude completed bookings
    });

    res.json({ count });
  } catch (error) {
    console.error("Error fetching booking count:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
