const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const featuredSchema = new Schema(
    {
        mainFeatureID: {
            type: String,
            required: true
        },
        subFeatureID: {
            type: String,
            required: true
        },
        subSubFeatureID: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('FeaturedPost', featuredSchema);