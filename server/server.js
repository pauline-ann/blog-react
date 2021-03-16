// ----- React Blog Server --------------------/

// ----- Dependencies --------------------/
const express = require("express");
const cors = require('cors');
const logger = require("morgan");
const favicon = require('express-favicon');

// ----- Init Mongo DB --------------------/
const connectDB = require("./config/db");
connectDB();

// ----- Setup --------------------/

// Create express server
const port = process.env.PORT || 8080;
const app = express();

// Serve up static assets
app.use(favicon(__dirname + '../client/public/favicon.ico'));
app.use(express.static(__dirname));
// app.use(express.static(path.join(__dirname, '../build')));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));

// ----- Mount Router --------------------/

// Test path for router
app.get('/ping', function (req, res) {
    return res.send('<p>pong</p>');
});

//Define any API routes before this runs
// app.get('/*', function (req, res) {
//     res.sendFile(path.join(__dirname, '../build', 'index.html'));
// });

// Append /api routing for our http requests
const postsRouter = require('./routes/api/posts');
app.use('/api/posts', postsRouter);

const imagesRouter = require('./routes/api/images');
app.use('/api/images', imagesRouter);

// ----- Listen --------------------/
app.listen(port, () => {
    console.log("------------------------------------------------------------");
    console.log(`React Blog application running on port ${port}...`);
});