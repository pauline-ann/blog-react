// ----- MongoDB Database Config --------------------/

const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(
            process.env.ATLAS_URI,
            {
                useUnifiedTopology: true,
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