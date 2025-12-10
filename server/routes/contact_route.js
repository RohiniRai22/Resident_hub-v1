// routes/contact.js
const express = require('express');
const router = express.Router();
const contactController = require('../user_controller/contactController');

// POST request to handle contact form submission
router.post('/submitcontact', contactController.submitContactForm);
router.get('/getcontacts', contactController.getAllContacts);
module.exports = router;
