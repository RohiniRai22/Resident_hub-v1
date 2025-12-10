const express = require('express');
const { ServiceProviderRegister, GetServiceProvider,getAllServiceProviders,GetServiceProviderbyid, UpdateStatus, ServiceProviderLogin, GetProfile, UpdateProfile } = require('../service_provider_controller/auth');
const { UpdateService } = require('../admin_controller/service');
const { insertPackage,getPackageId,getAllPackagesByProvider, updatePackage, deletePackage, getAllPackages, GetPackageById,subServiceId,getPackageCount } = require('../service_provider_controller/package_controller'); // Import package controller methods
const fetchAdmin = require('../middlewear/middlewear.js');
const upload = require('../middlewear/upload.js');
const router = express.Router();
const serviceprovider = require('../models/service_provider_model.js'); 
const service = require('../models/service_model.js'); 


// Auth Routes
router.post('/register', ServiceProviderRegister);
router.get('/get-service-provider', GetServiceProvider);
router.put('/update-service-provider/:id', UpdateStatus);
router.post('/login', ServiceProviderLogin);
router.get('/my-profile',fetchAdmin,GetProfile)
router.put('/update-profile',fetchAdmin,upload.single('businessImage'),UpdateProfile)

router.get('/GetServiceProviderbyid/:id', GetServiceProviderbyid);
router.get('/providerCount', async (req, res) => {
    try {
        const providerCount = await serviceprovider.countDocuments({});
        res.status(200).json({ count: providerCount });
    } catch (err) {
        console.error('Error fetching provider count:', err.message);
        res.status(500).json({ error: err.message });
    }
});
// router.get('/my-profile', async (req, res) => {
//   try {
//       const serviceProviderId = req.user.id; // Assuming `authMiddleware` adds `user.id` to the request
//       const serviceProvider = await ServiceProvider.findById(serviceProviderId)
//           .populate('businessType') // Populate service type details if needed
//           .exec();

//       if (!serviceProvider) {
//           return res.status(404).json({ message: "Service Provider not found" });
//       }

//       res.json(serviceProvider);
//   } catch (error) {
//       res.status(500).json({ message: "Server error", error });
//   }
// });
router.get('/total-package', async (req, res) => {
    try {
      const totalpackages = await Package.countDocuments({}); // Make sure your database has documents
      res.status(200).json({ totalpackages });
    } catch (err) {
      console.error('Error fetching total packages:', err.message);
      res.status(500).json({ error: err.message });
    }
  });
  
// Package Routes

router.post('/insertPackage', upload.single('thumbnail'), insertPackage);
// router.post('/insertPackage', upload.single('thumbnail'), insertPackage); // Add a package
router.put('/update-package/:id', upload.single('thumbnail'), updatePackage); // Update a package
router.delete('/delete-package/:id', deletePackage); // Delete a package
router.get('/packages', getAllPackages); // Get all packages
router.get('/getPackageById/:id', GetPackageById); // Get a package by ID
// router.get('/packages/:subServiceId', subServiceId);
// router.get('/getAllPackagesByProvider/:id', getAllPackagesByProvider);
// router.get('/getAllPackagesByProvider/:providerId',getAllPackagesByProvider);
router.get('/getAllPackagesByProvider/:serviceProviderId', getAllPackagesByProvider);
router.get('/getPackageId/:id', getPackageId);
// router.get('/getAllServiceProviders', getAllServiceProviders);
router.get('/getAllServiceProviders', getAllServiceProviders);
router.get('/getPackageCount/:serviceProviderId', getPackageCount);
module.exports = router;
