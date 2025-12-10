// controllers/contactController.js
const Contact = require('../models/Contact_model');

// Function to handle contact form submission
exports.submitContactForm = async (req, res) => {
  try {
    const { firstName, lastName, email, subject, message } = req.body;

    // Create a new contact entry
    const newContact = new Contact({
      firstName,
      lastName,
      email,
      subject,
      message,
    });

    // Save the contact entry to the database
    await newContact.save();

    return res.status(201).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred. Please try again later.' });
  }
};

// Controller function to get all contact form submissions
exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Failed to fetch contacts" });
  }
};
