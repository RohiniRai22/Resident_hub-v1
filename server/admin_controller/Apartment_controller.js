const Apartment = require('../models/apartment_model'); // adjust path if needed
const mongoose = require('mongoose');


const insertApartment = async (req, res) => {
  try {
    const {
      name,
      address,
      city,
      zipCode,
      areaSqFt,
      rentOrSalePrice,
      // availabilityStatus,
      contactName,
      contactPhone,
      apartcategory,
      amenities
    } = req.body;

    // Validate required fields on server side (optional but recommended)
    if (
      !name || !address || !city || !zipCode || !areaSqFt ||
      !rentOrSalePrice || !contactName ||
      !contactPhone || !apartcategory || !amenities
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Parse amenities JSON string into array
    let parsedAmenities;
    try {
      parsedAmenities = JSON.parse(amenities);
      if (!Array.isArray(parsedAmenities)) {
        throw new Error("Amenities must be an array");
      }
    } catch (error) {
      return res.status(400).json({ message: "Invalid amenities format." });
    }

    // Handle the uploaded file
    let thumbnailFilename = "";
    if (req.file) {
      thumbnailFilename = req.file.filename; // multer saves file with filename in req.file
    } else {
      return res.status(400).json({ message: "Thumbnail image is required." });
    }

    // Create a new Apartment document
    const newApartment = new Apartment({
      name,
      address,
      city,
      zipCode,
      areaSqFt,
      rentOrSalePrice: Number(rentOrSalePrice),
      // availabilityStatus,
      contactName,
      contactPhone,
      apartcategory,
      amenities: parsedAmenities,
      thumbnail: thumbnailFilename,
    });

    // Save to database
    await newApartment.save();

    res.status(201).json({ message: "Apartment added successfully", apartment: newApartment });
  } catch (error) {
    console.error("Error in insertApartment:", error);
    res.status(500).json({ message: "Server error, please try again later." });
  }
};

// Get all apartments
const getAllApartments = async (req, res) => {
  try {
    const apartments = await Apartment.find();
    res.status(200).json(apartments);
  } catch (error) {
    console.error('Error fetching apartments:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


// Get apartment by ID

const getApartmentById = async (req, res) => {
  try {
    const apartment = await Apartment.findById(req.params.id);
    if (!apartment) return res.status(404).json({ message: 'Apartment not found' });
    // res.status(200).json(apartment);
    res.status(200).json({ data: apartment });

  } catch (error) {
    console.error('Error fetching apartment:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


// Update apartment
const updateApartment = async (req, res) => {
    try {
      const updateData = req.body;
  
      if (req.files) {
        updateData.images = req.files.map(file => file.filename);
      }
  
      const updatedApartment = await Apartment.findByIdAndUpdate(req.params.id, updateData, { new: true });
      if (!updatedApartment) return res.status(404).json({ message: 'Apartment not found' });
  
      res.status(200).json(updatedApartment);
    } catch (errorf) {
      console.error('Error updating apartment:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
  

// Delete apartment
const deleteApartment = async (req, res) => {
  try {
    const deleted = await Apartment.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Apartment not found' });
    res.status(200).json({ message: 'Apartment deleted successfully' });
  } catch (error) {
    console.error('Error deleting apartment:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getApartmentsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const apartments = await Apartment.find({ apartcategory: categoryId }).populate('apartcategory');

    if (!apartments || apartments.length === 0) {
      return res.status(404).json({ message: "No apartments found for this category." });
    }

    res.status(200).json(apartments);
  } catch (error) {
    console.error("Error in getApartmentsByCategory:", error);
    res.status(500).json({ message: "Server error, please try again later." });
  }
};
module.exports = {
  insertApartment,
  getAllApartments,
  getApartmentById,
  updateApartment,
  deleteApartment,
  getApartmentsByCategory
};
