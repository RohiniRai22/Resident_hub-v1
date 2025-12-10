const express = require('express');
const dbConnection= require('./db');
const cors = require('cors');

const userRoutes = require('./routes/user_routes'); 
const app = express();

app.use(express.json());  
// Adjust the path as needed



app.use(cors());


app.use('/api/admin',require('./routes/admin_routes')  )
app.use('/api/user', userRoutes);

app.use('/api/service-provider',require('./routes/service_provider_routes'))

app.use('/api/booking',require('./routes/booking_routes'))
app.use('/api/apartment',require('./routes/apartment_route'))
app.use('/api/payment',require('./routes/payment_route'))
app.use('/api/feedback',require('./routes/Feedback_route'))
app.use('/api/contact',require('./routes/contact_route'))


// app.use("/api/image/", express.static("./Uploads"))

app.use('/api/image/', express.static('./uploads'));


dbConnection();


const PORT = 5000;




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
