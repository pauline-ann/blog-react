const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const path = require('path');
const GridFsStorage = require('multer-gridfs-storage');
const multer = require('multer');
const Grid = require('gridfs-stream');
const mongoose = require('mongoose');

// ----- Mongo Connection --------------------/
require('dotenv').config();
const uri = process.env.ATLAS_URI;
const conn = mongoose.createConnection()

// // ----- Init Grid FS --------------------/
let gfs;
conn.once('open', () => {
    // Init Stream
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
})

// Create storage engine
const storage = new GridFsStorage({
    url: uri,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            // Generate long unique string
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

// POST api/images
// Upload file to db using GridFS/Multer middleware (breaks image file down into chunks)
router.post('/upload', upload.single('file'), (req, res) => {
    res.json({ file: req.file })
});

module.exports = router;