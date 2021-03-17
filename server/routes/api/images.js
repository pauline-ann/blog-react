const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const crypto = require('crypto');
const path = require('path');
const multer = require('multer');
const methodOverride = require('method-override');
const GridFsStorage = require('multer-gridfs-storage');

// ----- Mongo Connection --------------------/
// Initialize GridFS stream
require('dotenv').config();
const uri = process.env.ATLAS_URI;
const connect = mongoose.createConnection(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
});
let gfs;
connect.once('open', () => {
    gfs = new mongoose.mongo.GridFSBucket(connect.db, {
        bucketName: 'uploads'
    })
})

// Create storage engine
const storage = new GridFsStorage({
    url: uri,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            // Generate long unique string for filenames being stored and read from db
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads'
                };
                resolve(fileInfo);
            });
        });
    }
});

// Middleware that will be used on POST route to upload to the db
const upload = multer({ storage });

// GET api/images/test
// Tests routing for images
router.get('/test', (req, res) => res.send('Images route testing!'));

// GET api/images
// Display all image files in JSON
router.get('/files', (req, res) => {
    gfs.find().toArray((err, files) => {

        //Check if files
        if (!files || files.length === 0) {
            return res.status(404).json({
                err: 'No image files exist.'
            });
        }

        // Files exist 
        return res.json(files)
    });
});

// POST api/images/upload
// Upload file to db using GridFS/Multer middleware (breaks image file down into chunks)
router.post('/upload', upload.single('file'), (req, res) => {
    res.status(200).json({
        file: req.file,
        message: 'File uploaded successfully.'
    })
});

module.exports = router;