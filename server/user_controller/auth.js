
const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
// const userSchema = require('../models/User'); // Assuming you have this user model
const key = "zmdb"; 
const bcrypt = require('bcrypt');
const userSchema = require('../models/customer_model');
const Package = require('../models/package_model');
const Service = require('../models/service_model');
const Booking = require('../models/booking_model'); 

// Register a new user
const UserRegister = async (req, res) => {
  try {
    const { name, email, phone, address, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const secpass = await bcrypt.hash(password, salt);

    const Register = new userSchema({
      name,
      email,
      phone,
      address,
      password: secpass
    });

    const Registered = await Register.save();
    res.json({ success: true, Registered });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error registering user' });
  }
};

// User login without JWT
// const UserLogin = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await userSchema.findOne({ email });
//     if (!user) {
//       return res.json({ success: false, message: 'Incorrect email or password' });
//     }
//     const ismatch = await bcrypt.compare(password, user.password);
//     if (!ismatch) {
//       return res.json({ success: false, message: 'Incorrect Password' });
//     }

//     // Send back userId without JWT token
//     res.json({
//       userId: user.id,
//       success: true,
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: 'Error logging in' });
//   }
// };

const UserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userSchema.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: 'Incorrect email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: 'Incorrect Password' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, key, { expiresIn: '1h' });

    // Send back userId and token
    res.json({
      userId: user._id,
      userToken: token, // Return token in response
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error logging in' });
  }
};

// Fetch all users
const GetUser = async (req, res) => {
  try {
    const ViewUser = await userSchema.find();
    res.send(ViewUser);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error occurred");
  }
};

// Get packages by sub-service ID
const subServiceId = async (req, res) => {
  try {
    const subServiceId = req.params.subServiceId;
    const packages = await Package.find({ sub_service: subServiceId });
    if (!packages.length) {
      return res.status(404).json({ message: 'No packages found for this subservice.' });
    }
    res.status(200).json(packages);
  } catch (error) {
    console.error('Error fetching packages:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get package details by ID
const getPackageById = async (req, res) => {
  try {
    const packageId = req.params.packageId;
    const packageDetails = await Package.findById(packageId)
      .populate('sub_service') // Populate the sub_service field if needed
      .exec();
    if (!packageDetails) {
      return res.status(404).json({ message: 'Package not found.' });
    }
    res.json(packageDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get sub-service details for a package
const getSubService = async (req, res) => {
  try {
    const { packageId } = req.params;

    // Fetch the package and populate the sub_service field
    const package = await Package.findById(packageId).populate('sub_service');
    if (!package) {
      return res.status(404).json({ message: 'Package not found' });
    }

    const subService = package.sub_service;
    if (!subService) {
      return res.status(404).json({ message: 'SubService not found' });
    }

    res.json(subService);
  } catch (error) {
    console.error('Error fetching subservice details:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get service details by package ID
const getService = async (req, res) => {
  try {
    const { packageId } = req.params;

    // Find the service by its ID
    const service = await Service.findById(packageId).populate('providerId');
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    // Send the found service as the response
    return res.status(200).json(service);
  } catch (error) {
    console.error('Error fetching service:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Book a service
const bookService = async (req, res) => {
  const { packageId, fullName, emailAddress, phoneNumber, serviceDate, serviceTime, preferredTechnician } = req.body;
  
  if (!fullName || !emailAddress || !phoneNumber || !serviceDate || !serviceTime) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }
  
  try {
    const newBooking = new Booking({
      packageId,
      fullName,
      emailAddress,
      phoneNumber,
      serviceDate,
      serviceTime,
      preferredTechnician,
    });
    await newBooking.save();
    res.status(201).json({ message: 'Service booked successfully' });
  } catch (error) {
    console.error('Error booking service:', error);
    res.status(500).json({ message: 'Error booking service' });
  }
};

const GetUserByid = async (req, res) => {
  try {
    const userId = req.params.id; // Get ID from route params
    const user = await userSchema.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error occurred");
  }
};

module.exports = {
  UserRegister,
  UserLogin,
  GetUser,
  subServiceId,
  getPackageById,
  getSubService,
  bookService,
  getService,
  GetUserByid
};
