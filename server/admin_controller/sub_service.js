const subService = require('../models/subservices_model');
const Service = require('../models/service_model'); // Correct path if necessary
const serviceProvider = require('../models/service_provider_model');
const jwt = require('jsonwebtoken'); // Make sure you have the 'jsonwebtoken' library installed

const AddSubService = async (req, res) => {
    try {
        const { service_id, sub_service } = req.body;
        console.log(req.body);
        const serviceData = new subService({ service_id, sub_service });

        const savedData = await serviceData.save();
        res.json({ success: true, savedData });
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal error occurred");
    }
};

const GetSubService = async (req, res) => {
    try {
        const serviceData = await subService.find().populate('service_id');
        res.status(200).json(serviceData);
    } catch (error) {
        console.error("Error fetching sub-services:", error);  // More detailed logging
        res.status(500).send("An internal server error occurred");
    }
};




const MySubService = async (req, res) => {
    try {
        // Verify and decode the token
        const token = req.headers['auth-token'];
        if (!token) {
            return res.status(401).send('Access Denied');
        }

        const decoded = jwt.verify(token, 'zmdb'); // Replace 'your_secret_key' with your actual secret key
        const id = decoded.userId; // or however you store the user ID in the token

        // Find service provider by ID
        const data = await serviceProvider.findById(id);
        if (!data) {
            return res.status(404).send('Service Provider Not Found');
        }

        const service_id = data.businessType;
        const serviceData = await subService.find({ service_id }).populate('service_id');
        res.send(serviceData);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal error occurred");
    }
};






const DeleteSubService = async (req, res) => {
    try {
        const id = req.params.id;
        const serviceData = await subService.findByIdAndDelete(id);
        res.json({ success: true, serviceData });
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal error occurred");
    }
};

const UpdateSubService = async (req, res) => {
    try {
        const id = req.params.id;
        const { service_id, sub_service } = req.body;
        console.log(req.body);
        const findData = await subService.findById(id);
        if (!findData) {
            return res.status(404).send("Not Found");
        }
        const newService = {};
        if (service_id) newService.service_id = service_id;
        if (sub_service) newService.sub_service = sub_service;
        const serviceData = await subService.findByIdAndUpdate(id, { $set: newService }, { new: true });
        res.json({ serviceData });
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal error occurred");
    }
};


// Controller for /api/admin/getAllSubServices
const getAllSubServices = async (req, res) => {
  try {
    const subServices = await SubService.find();
    res.status(200).json(subServices);
  } catch (err) {
    res.status(500).json({ message: "Error fetching sub-services." });
  }
};


module.exports = { AddSubService, GetSubService, DeleteSubService, UpdateSubService, MySubService,getAllSubServices };
