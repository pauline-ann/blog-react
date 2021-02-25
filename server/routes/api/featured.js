const express = require('express');
const router = express.Router();

// Load post mongoose model
const Featured = require('../../models/featured.model');

// GET api/featured/test
// Tests routing for featured posts
router.get('/test', (req, res) => res.send('Featured route testing!'));

// GET api/featured
// Route for all featured posts
router.get('/', (req, res) => {
  Featured.find()
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ Error: err, Description: 'No Featured Posts found.' }));
});

// GET api/featured/new
// Route to add/save featured posts
router.post('/new', (req, res) => {

  const mainFeatureID = req.body.mainFeatureID;
  const subFeatureID = req.body.subFeatureID;
  const subSubFeatureID = req.body.subSubFeatureID;

  const newFeaturedPosts = new Featured({
    mainFeatureID,
    subFeatureID,
    subSubFeatureID
  })

  newFeaturedPosts.save()
    .then(() => res.json({
      Message: 'Featured Posts added successfully!',
      newFeaturedPostsID: newFeaturedPosts._id
    }))
    .catch(err => res.status(400).json({ err }));
});

// GET api/featured/:id
// Route to update featured posts
router.put('/:id', (req, res) => {

  const updatedFeaturedPosts = {
    mainFeatureID: req.body.mainFeatureID,
    subFeatureID: req.body.subFeatureID,
    subSubFeatureID: req.body.subSubFeatureID
  }

  Post.findByIdAndUpdate(req.params.id, updatedFeaturedPosts)
    .then(() => res.json({ Message: 'Featured Posts updated successfully!' }))
    .catch(err =>
      res.status(400).json({ Error: err, Description: 'Unable to update featured posts.' })
    );
});

module.exports = router;