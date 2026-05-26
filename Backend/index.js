const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoute = require('./routes/authRoute');

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors(
    {
        origin:'http://localhost:5173',
        credentials:true,
    }
));

app.use('/api/auth', authRoute);

const port = process.env.port || 5000;
app.listen(port,()=>{
    console.log("server is running on port",port);  
})