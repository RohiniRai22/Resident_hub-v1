const express=require('express')
const { UserRegister, UserLogin, GetUser,subServiceId,getPackageById,getService,GetUserByid,bookService } = require('../user_controller/auth')
const {processPayment} = require('../user_controller/paymentController')
const router=express.Router()
const user = require('../models/customer_model');



// users
router.post('/register',UserRegister)
router.post('/login',UserLogin)
router.get('/get-user',GetUser)
router.get('/usercount', async (req, res) => {
    try {
        const userCount = await user.countDocuments({});
        res.status(200).json({ count: userCount });
    } catch (err) {
        console.error('Error fetching user count:', err.message);
        res.status(500).json({ error: err.message });
    }
});

router.get('/packages/:subServiceId', subServiceId);
router.get('/package/:packageId',getPackageById);

// Route to get service details by package ID
router.get('/GetService/:packageId', getService);

// Route to book a service
router.post('/BookService', bookService);
router.post('/process', processPayment);
router.get('/getUserById/:id', GetUserByid);


module.exports=router