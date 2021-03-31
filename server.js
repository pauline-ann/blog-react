// ----- React Blog Server --------------------/

// ----- Dependencies --------------------/
const express = require("express");
const cors = require('cors');
const logger = require("morgan");
const favicon = require('express-favicon');
const path = require('path');

// ----- Init Mongo DB --------------------/
const connectDB = require("./config/db");
connectDB();

// ----- Init Express Server --------------------/
const app = express();

// ----- Middleware --------------------/
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));

// ----- Mount Router --------------------/

// Test path for router
app.get('/ping', function (req, res) {
    return res.send('<p>pong</p>');
});

// Append /api routing for our http requests
const postsRouter = require('./routes/api/posts');
app.use('/api/posts', postsRouter);

const imagesRouter = require('./routes/api/images');
app.use('/api/images', imagesRouter);

console.log(process.env.NODE_ENV)

// Serve up static assets if in production
if (process.env.NODE_ENV === 'production') {
    console.log('testing production mode')
    // Set static folder
    app.use(express.static(path.join(__dirname + '/client/build')));
    app.use(favicon(__dirname + '/client/build/favicon.ico'));

    // Define any API routes before this runs
    // Any requests that's not to the API...
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
    })
} else {
    app.use(favicon(__dirname + '/client/public/favicon.ico'));
    require('dotenv').config();
}

// ----- Listen --------------------/
const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log("------------------------------------------------------------");
    console.log(`React Blog application running on port ${port}...`);
});