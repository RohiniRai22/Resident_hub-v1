const express=require('express')
const {  insertApartment,
    getAllApartments,
    getApartmentById,
    updateApartment,
    getApartmentsByCategory,
    deleteApartment } = require('../admin_controller/Apartment_controller')

const router=express.Router()
const apartment = require('../models/apartment_model');

const upload = require('../middlewear/upload.js');

// users
router.post('/insertApartment',upload.single('thumbnail'),insertApartment)

router.get('/getAllApartments',getAllApartments)
router.get('/apartments-by-category/:categoryId', getApartmentsByCategory);
router.get('/getApartmentById/:id',getApartmentById)
// router.get('/usercount', async (req, res) => {
//     try {
//         const userCount = await user.countDocuments({});
//         res.status(200).json({ count: userCount });
//     } catch (err) {
//         console.error('Error fetching user count:', err.message);
//         res.status(500).json({ error: err.message });
//     }
// });


router.put('/updateApartment/:id', updateApartment)
router.delete('/deleteApartment/:id', deleteApartment)

router.get('/apartmentCount', async (req, res) => {
    try {
        const apartmentCount = await apartment.countDocuments({});
        res.status(200).json({ count: apartmentCount });
    } catch (err) {
        console.error('Error fetching apartment count:', err.message);
        res.status(500).json({ error: err.message });
    }
});
module.exports=router