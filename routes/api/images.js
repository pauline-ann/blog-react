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
router.get('/', (req, res) => {
    gfs.find().toArray((err, files) => {

        //Check if files
        if (!files || files.length === 0) {
            return res.status(404).json({
                message: 'No image files exist.',
                error: err
            });
        }

        // Files exist 
        return res.json(files)
    });
});

// GET api/images/:filename
// Display specific image file in JSON
router.get('/:filename', (req, res) => {
    gfs.find({ filename: req.params.filename })
        .toArray((err, files) => {

            //Check if file
            if (!files[0] || files.length === 0) {
                return res.status(404).json({
                    message: 'No image exists.',
                    error: err
                });
            }

            // Files exist 
            return res.json(files[0])
        });
});

// GET api/images/render/:filename
// Render fetched image to browser
router.get('/render/:filename', (req, res) => {
    gfs.find({ filename: req.params.filename })
        .toArray((err, files) => {

            let file = files[0]

            // Check if file
            if (!file || files.length === 0) {
                return res.status(404).json({
                    message: 'No image exists.',
                    error: err
                });
            }

            // If image
            if (file.contentType === 'image/jpeg' || file.contentType === 'image/png' || file.contentType === 'image/svg+xml') {
                // Render image to browser
                gfs.openDownloadStreamByName(req.params.filename).pipe(res)
            } else {
                // Not an image
                res.status(404).json({
                    err: 'Not an image'
                })
            }
        });
});

// POST api/images/upload
// Upload file to db using GridFS/Multer middleware (breaks image file down into chunks)
router.post('/upload', upload.single('file'), (req, res) => {
    console.log('File uploaded successfully.')
    res.status(200).json({
        file: req.file,
        message: 'File uploaded successfully.'
    })
});

// DELETE api/images/:filename
// Delete image by ID
router.post('/:id', (req, res) => {
    gfs.delete(new mongoose.Types.ObjectId(req.params.id), (err, data) => {
        if (err) {
            return res.status(404).json({ err: err })
        }

        console.log(`File with ID ${req.params.id} is deleted`)
        return res.status(200).json({
            message: `File with ID ${req.params.id} is deleted`
        })
    })
})

module.exports = router;