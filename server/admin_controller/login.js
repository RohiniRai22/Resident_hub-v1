// const admin=require('../models/admin_model')
// const bcrypt = require('bcrypt');
// var jwt = require('jsonwebtoken');

// const key="zmdb"


// const Login=async(req,res)=>{
//     try{
//         const {email,password}=req.body;
//         const user=await admin.findOne({email})
//          if(!user){
//             return res.json({success:false,message:'Incorrect email or password'})
//          }
//          const ismatch=await bcrypt.compare(password,user.password)
//          if(!ismatch){
//             return res.json('Incorrect Password')
//          }
//          const data=user.id
//          const token=await jwt.sign(data,key)
//          const success=true;
//          res.json({token,success})
//     }
//     catch(err){
//         console.log(err)
//     }
   
// }

// module.exports={Login}


const admin = require('../models/admin_model');
const jwt = require('jsonwebtoken');

const key = "zmdb";

const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the admin by email
        const user = await admin.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: 'Incorrect email or password' });
        }

        // Directly compare the plain-text password with the stored password
        if (password !== user.password) {
            return res.status(401).json({ success: false, message: 'Incorrect Password' });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user._id }, key);

        res.json({ token, success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

module.exports = { Login };
