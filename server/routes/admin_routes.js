const express=require('express')
const { Login } = require('../admin_controller/login')
const { AddService, GetService, DeleteService, UpdateService,GetServicebyid,} = require('../admin_controller/service')
const { AddSubService, GetSubService, DeleteSubService, UpdateSubService, MySubService,getAllSubServices } = require('../admin_controller/sub_service')
const fetchAdmin = require('../middlewear/middlewear')
const router=express.Router()
const service = require('../models/service_model'); 


router.post('/login',Login)




// service
router.post('/add-service',AddService)
router.get("/get-service",GetService)
router.delete("/delete-service/:id",DeleteService)
router.put("/update-service/:id",UpdateService)
router.get('/GetServicebyid/:id',GetServicebyid)

//sub-service
router.post('/add-sub-service',AddSubService)
router.get("/get-sub-service",GetSubService)
router.get("/my-sub-service",fetchAdmin,MySubService)

router.delete("/delete-sub-service/:id",DeleteSubService)
router.put("/update-sub-service/:id",UpdateSubService)
router.get('/serviceCount', async (req, res) => {
    try {
        const serviceCount = await service.countDocuments({});
        res.status(200).json({ count: serviceCount });
    } catch (err) {
        console.error('Error fetching service count:', err.message);
        res.status(500).json({ error: err.message });
    }
});
router.get('/getAllSubServices', getAllSubServices);

module.exports=router