const Package = require('../models/package_model.js');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

// Insert a new package
// const insertPackage = async (req, res) => {
//     try {
//       // Extract and parse data
//       const { title, service, sub_service, price, description, amenties } = req.body;
  
//       // Validate required fields
//       if (!title || !sub_service || !price || !description || !amenties) {
//         return res.status(400).json({ message: 'All required fields must be provided' });
//       }
  
//       // Parse amenties if it is a stringified array
//       let parsedAmenties;
//       try {
//         parsedAmenties = JSON.parse(amenties);
//       } catch (error) {
//         return res.status(400).json({ message: 'Invalid amenties format' });
//       }
  
//       // Create and save the new package
//       const newPackage = new Package({
//         title,
//         service, // This field is now optional
//         sub_service,
//         price,
//         description,
//         amenties: parsedAmenties,
//         thumbnail: req.file ? req.file.path : null, // Handle file upload
//       });
  
//       const savedPackage = await newPackage.save();
  
//       res.status(201).json({
//         message: 'Package added successfully!',
//         package: savedPackage,
//       });
//     } catch (error) {
//       console.error('Error inserting package:', error);
//       res.status(500).json({ message: 'Server error', error: error.message });
//     }
//   };
  
  
const insertPackage = async (req, res) => {
  try {
    // Extract and parse data
    const { title, sub_service, price, description, amenities, service_provider_id } = req.body;

    // Validate required fields
    if (!title || !sub_service || !price || !description || !amenities || !service_provider_id) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    // Parse amenities if it is a stringified array
    let parsedAmenities;
    try {
      parsedAmenities = JSON.parse(amenities);
      if (!Array.isArray(parsedAmenities)) {
        return res.status(400).json({ message: 'Invalid amenities format' });
      }
    } catch (error) {
      return res.status(400).json({ message: 'Invalid amenities format' });
    }

    // Create and save the new package
    const newPackage = new Package({
      title,
      sub_service,
      price,
      description,
      service_provider_id,
      amenities: parsedAmenities.filter(amenity => amenity), // Filter out null or empty values
      thumbnail: req.file ? req.file.filename : null, // Handle file upload
    });
    const savedPackage = await newPackage.save();
    res.status(201).json({
      message: 'Package added successfully!',
      package: savedPackage,
    });
  } catch (error) {
    console.error('Error inserting package:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};




  
  
const getAllPackages = async (req, res) => {
  try {
    // Fetch all packages from the database
    const packages = await Package.find();
    
    // Send a JSON response with status 200 and the fetched packages
    res.status(200).json(packages);
  } catch (error) {
    // Log the error for debugging
    console.error('Error fetching packages:', error);
    
    // Send a JSON response with status 500 and error details
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


  
// Get a package by ID

const GetPackageById = async (req, res) => {
  try {
    const package = await Package.findById(req.params.id);
    if (!package) {
      return res.status(404).json({ error: 'Package not found' });
    }
    res.json(package);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

 // Adjust the path as needed

 const updatePackage = async (req, res) => {
  try {
    const { title, sub_service, price, description, amenities } = req.body;
    const updatedPackage = await Package.findByIdAndUpdate(
      req.params.id,
      { title, sub_service, price, description, amenities: JSON.parse(amenities) },
      { new: true }
    );

    if (!updatedPackage) {
      return res.status(404).json({ error: "Package not found" });
    }

    res.json(updatedPackage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};




// Get package by ID
const getPackageId = async (req, res) => {
  try {
    const packageId = req.params.id;

    // Find the package by ID
    const packageData = await Package.findById(packageId);
    if (!packageData) {
      return res.status(404).json({ success: false, message: 'Package not found' });
    }

    res.status(200).json({ success: true, data: packageData });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// 




// Delete a package by ID tepackagedlete package that req.res.message that find and dele
const deletePackage = async (req, res) => {
  try {
    const packageId = req.params.id;
    const deletedPackage = await Package.findByIdAndDelete(packageId);

    if (!deletedPackage) {
      return res.status(404).json({ message: 'Package not found' });
    }
    res.status(200).json({ message: 'Package deleted successfully!' });
  } catch (error) {
    console.error('Error deleting package:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


// Controller for /api/service-provider/getAllPackagesByProvider/:providerId


const getAllPackagesByProvider = async (req, res) => {
  const serviceProviderId = req.params.serviceProviderId;

  try {
    // Ensure providerId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(serviceProviderId)) {
      return res.status(400).json({ message: "Invalid provider ID." });
    }

    // Fetch packages for the given service provider ID
    const packages = await Package.find({ service_provider_id: serviceProviderId });
packages
    // Check if packages were found
    if (!packages || packages.length === 0) {
      return res.status(404).json({ message: "No packages found for this service provider." });
    }

    // Return the found packages
    res.status(200).json(packages);
  } catch (err) {
    // Log the error details for debugging degubbing the act packages that fetchings console package
    console.error("Error fetching packages:", err);
    res.status(500).json({ message: "Error fetching packages.", error: err.message });
  }
};

const getPackageCount = async (req, res) => {
  const { serviceProviderId } = req.params;
  try {
    const count = await Package.countDocuments({ service_provider_id: serviceProviderId });
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching package count' });
  }
};


module.exports = {
  insertPackage,
  getAllPackages,
  GetPackageById,
  updatePackage,
  deletePackage,
  getAllPackagesByProvider,
  getPackageId,
  getPackageCount
  
};
