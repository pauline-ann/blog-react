// ----- React Blog Server --------------------/

// ----- Dependencies --------------------/
const express = require("express");
const cors = require('cors');
const logger = require("morgan");
const mongoose = require("mongoose");
const favicon = require('express-favicon');
const path = require('path');
const Data = require('./data.js');

const router = express.Router();

// Configure env. variables in dotenv file
require('dotenv').config();

// ----- MongoDB Database --------------------/

const uri = process.env.ATLAS_URI;

// Connect backend code with database
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
let connection = mongoose.connection;

// Check if connected
connection.once('open', () => console.log('MongoDB connection established successfully!'));
connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

// ----- Setup --------------------/

// Create express server
const port = process.env.PORT || 8080;
const app = express();

// Serve up static assets
app.use(favicon(__dirname + '/build/favicon.ico'));
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));

// ----- Mount Router --------------------/

// Test path for router
app.get('/ping', function (req, res) {
    return res.send('pong');
});

// this is our get method
// this method fetches all available data in our database
router.get('/getData', (req, res) => {
    Data.find((err, data) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: data });
    });
});

// this is our update method
// this method overwrites existing data in our database
router.post('/updateData', (req, res) => {
    const { id, update } = req.body;
    Data.findByIdAndUpdate(id, update, (err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

// this is our delete method
// this method removes existing data in our database
router.delete('/deleteData', (req, res) => {
    const { id } = req.body;
    Data.findByIdAndRemove(id, (err) => {
        if (err) return res.send(err);
        return res.json({ success: true });
    });
});

// this is our create methid
// this method adds new data in our database
router.post('/putData', (req, res) => {
    let data = new Data();

    const { id, message } = req.body;

    if ((!id && id !== 0) || !message) {
        return res.json({
            success: false,
            error: 'INVALID INPUTS',
        });
    }
    data.message = message;
    data.id = id;
    data.save((err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

// Define any API routes before this runs
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Append /api for our http requests
app.use('/api', router);

// ----- Listen --------------------/
app.listen(port, () => {
    console.log("------------------------------------------------------------");
    console.log(`React Blog application running on port ${port}...`);
});