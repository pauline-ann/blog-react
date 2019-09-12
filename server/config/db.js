// ----- MongoDB Database Config --------------------/

const mongoose = require('mongoose');

// Configure env. variables in dotenv file
require('dotenv').config();
const uri = process.env.ATLAS_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(
            uri,
            {
                useNewUrlParser: true,
                useCreateIndex: true
            }
        );
        console.log('MongoDB connection success.');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;