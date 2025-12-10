const serviceProviderSchema=require("../models/service_provider_model")
const bcrypt= require('bcrypt')
const jwt = require('jsonwebtoken')
const key="zmdb"
const Service = require('../models/service_model'); // Assuming you have a Service model
const Booking = require('../models/booking_model'); // Assuming you have a Booking model
// const Payment = require('../models/Payment'); // Assuming you have a Payment model
// const Feedback = require('../models/Feedback');

const ServiceProviderRegister = async(req,res)=>{
    console.log(req.body);
    try{
       
        const {name,email,phone,password,businessName,address,businessContactNo,businessType}=req.body
        // const image = req.files['image'][0].filename;
        // const logo = req.files['logo'][0].filename;

        const salt= await bcrypt.genSalt(10)
        const secpass= await bcrypt.hash(password,salt)
        console.log(salt)
        const data={
            name,
            email,
            phone:businessContactNo,
            address,
            phone,
            businessName,
            businessType,
            password:secpass,
            // status:"pending"
            
        }
        const Register=await new serviceProviderSchema(data)
        const Registered=Register.save()
        res.json({success:true,Registered})
    }
    catch(err){
        console.log(err)
    }
}

const ServiceProviderLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await serviceProviderSchema.findOne({ email});
  
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
        serviceProviderId: user._id, // Ensure this field name matches the frontend expectation
        serviceToken: token, // Ensure this field name matches the frontend expectation
        success: true,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false, message: 'Error logging in' });
    }
  };
  
  
  


const GetProfile = async (req, res) => {
    console.log('Request received');
    try {
        // ... (your existing code)
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).send('Internal server error');
    }
}


const GetServiceProvider = async (req, res) => {
    try {
        const ViewServiceProvider= await serviceProviderSchema.find().populate('businessType');

        res.send(ViewServiceProvider);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error occurred");
    }
}

const GetServiceProviderbyid = async (req, res) => {
    try {
        const { id } = req.params;
        const serviceProvider = await serviceProviderSchema.findById(id).populate('businessType');

        if (!serviceProvider) {
            return res.status(404).send("Service provider not found");
        }

        res.send(serviceProvider);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error occurred");
    }
};




const UpdateStatus=async(req,res)=>{
    try{
        const id=req.params.id
        const {status}=req.body
        console.log(req.body);
        const findData=await serviceProviderSchema.findById(id)
        if(!findData){
            return res.status(404).send("Not Found");
        }
        const newService={}
        if(status){newService.status=status}
        const serviceData=await serviceProviderSchema.findByIdAndUpdate(id,{$set:newService},{new:true})
        res.json({serviceData})



    }catch(error){
        console.log(error);
        res.status(500).send("Internal some error occured");
    }

}


const UpdateProfile=async(req,res)=>{
    try {
        const id = req.user; // Assuming `req.user` contains the authenticated user's ID
        const updateData = req.body;
        console.log(req.body);

        // If an image file is provided, process it
        if (req.file) {
            updateData.profilePicture = req.file.filename; // Assuming `req.file` is processed using Multer
        }

        // Find the service provider by ID and update the profile with new data
        const updatedServiceProvider = await serviceProviderSchema.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true } // Return the updated document
        );

        if (!updatedServiceProvider) {
            return res.status(404).send("Service provider not found");
        }

        res.json({ success: true, updatedServiceProvider });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error occurred");
    }

}

const getDashboardData = async (req, res) => {
    try {
      // Fetch counts from various collections
      const totalServices = await Service.countDocuments();
      const totalBookings = await Booking.countDocuments();
    //   const totalPayments = await Payment.countDocuments();
    //   const totalFeedback = await Feedback.countDocuments();
  
      // Send the response with the collected data
      res.status(200).json({
        totalServices,
        totalBookings,
        // totalPayments,
        // totalFeedback,
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      res.status(500).json({ error: 'An error occurred while fetching data' });
    }
  };
  const getAllServiceProviders = async (req, res) => {
    try {
        const serviceProviders = await ServiceProvider.find(); // Use the model
        res.setHeader('Content-Type', 'application/json'); // Set Content-Type header
        res.json(serviceProviders); // Send JSON response
    } catch (error) {
        console.error('Error fetching service providers:', error);
        res.status(500).json({ message: 'Server Error' }); // Handle errors
    }
};

module.exports={ServiceProviderRegister,getAllServiceProviders,getDashboardData,GetServiceProviderbyid,ServiceProviderLogin,GetProfile,GetServiceProvider,UpdateStatus,UpdateProfile}