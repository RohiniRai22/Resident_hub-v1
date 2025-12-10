const Service = require('../models/service_model');
const SubService = require('../models/subservices_model');
const Package = require('../models/package_model'); 

// Add a new service
const AddService = async (req, res) => {
    try {
        const { name, providerId } = req.body;  // Extract providerId if it's sent

        // Create a new service without providerId if it's not provided
        const newService = new Service({
            name,
            providerId: providerId || null  // Set to null if providerId is not present
        });

        const savedService = await newService.save();
        res.status(201).json({ success: true, service: savedService });
    } catch (error) {
        console.error("Error saving service: ", error);
        res.status(500).json({ error: 'Failed to add service' });
    }
};




// Get all services
const GetService = async (req, res) => {
    try {
        const serviceData = await Service.find(); // Populate providerId
        // const serviceData = await Service.find().populate('providerId'); // Populate providerId
        res.json(serviceData);

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal error occurred");
    }
};

// Delete a service by ID
const DeleteService = async (req, res) => {
    try {
        const id = req.params.id;
        const serviceData = await Service.findByIdAndDelete(id);

        if (!serviceData) {
            return res.status(404).send("Service not found");
        }

        res.json({ success: true, serviceData });

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal error occurred");
    }
};

// Update a service by ID
const UpdateService = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, providerId } = req.body; // Ensure providerId is included if needed
        console.log(req.body);

        const updateData = {};
        if (name) updateData.name = name;
        if (providerId) updateData.providerId = providerId; // Update providerId if provided

        const serviceData = await Service.findByIdAndUpdate(id, { $set: updateData }, { new: true });

        if (!serviceData) {
            return res.status(404).send("Service not found");
        }

        res.json({ serviceData });

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal error occurred");
    }
};





const GetServicebyid = async (req, res) => {
    try {
      const service = await Service.findById(req.params.id);
      if (!service) {
        return res.status(404).json({ message: 'Service not found' });
      }
  
      const subservices = await SubService.find({ service_id: req.params.id });
      const packages = await Package.find({ service: req.params.id }).populate('sub_service');
  
      // Ensure package includes serviceProviderId
      console.log(packages);  // Log to verify if serviceProviderId exists
  
      res.json({ service, subservices, packages });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  }
  
module.exports = { AddService, GetService, DeleteService,GetServicebyid, UpdateService };
