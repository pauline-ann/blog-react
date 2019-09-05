// ----- React Blog Server --------------------/

// ----- Dependencies --------------------/
var express = require("express");
var cors = require('cors');
const bodyParser = require('body-parser');
var logger = require("morgan");
var mongoose = require("mongoose");
const favicon = require('express-favicon');
const path = require('path');
const Data = require('./data.js');

const router = express.Router();

// ----- MongoDB Database --------------------/

const dbRoute = 'mongodb://localhost/test';

// Connect backend code with database
mongoose.connect(dbRoute, { useNewUrlParser: true });
let db = mongoose.connection;

// Check if connected
db.once('open', () => console.log('Connected to the database!'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// ----- Setup --------------------/

// Server Port
const port = process.env.PORT || 8080;
const app = express();
app.use(cors());

// Serve up static assets
app.use(favicon(__dirname + '/build/favicon.ico'));
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));

// User parsers & logging
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
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