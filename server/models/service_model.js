// const mongoose=require('mongoose')

// const serviceSchema=new mongoose.Schema({
//     name:{
//         type:String,
//         require:true
//     },
   
// },{timestamps:true})


// module.exports=mongoose.model('service',serviceSchema)

const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
   
}, { timestamps: true });

module.exports = mongoose.model('service', serviceSchema);
