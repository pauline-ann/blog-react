const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    rating: {
        aesthetic: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },
        vibes: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        }
    },
    photo: {
        fileName: {
            type: String,
            required: true
        },
        fileID: {
            type: String,
            required: true
        }
    },

}, {
    timestamps: true
});

module.exports = mongoose.model('Post', postSchema);