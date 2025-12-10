const mongoose = require('mongoose')
const URI= 'mongodb://127.0.0.1:27017/ResidentHub'

const mongoConnect = async()=>{
    try{
        await mongoose.connect(URI);
        console.log('Mongo Connected Successfully')
    }
    catch(err){
        console.log(err);
    }
}


module.exports=mongoConnect;

// const mongoose = require('mongoose');
// const URI = 'mongodb://127.0.0.1:27017/hair-salon';

// const mongoConnect = async () => {
//     try {
//         await mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });
//         console.log('Mongo Connected Successfully');
//     } catch (err) {
//         console.log('Mongo Connection Error:', err);
//     }
// };

// module.exports = mongoConnect;
