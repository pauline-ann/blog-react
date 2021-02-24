const express = require('express');
const router = express.Router();

// Load post mongoose model
const Post = require('../../models/post.model');

// GET api/posts/test
// Tests routing for posts
router.get('/test', (req, res) => res.send('Posts route testing!'));

// GET api/posts
// Route for all posts
router.get('/', (req, res) => {
  Post.find()
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ Error: err, Description: 'No Posts found.' }));
});

// GET api/posts/:id
// Route for single post by id
router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => res.status(404).json({ Error: err, Description: 'Post not found.' }));
});

// GET api/posts/new
// Route to add/save post
router.post('/new', (req, res) => {

  const title = req.body.title;
  const description = req.body.description;
  const content = req.body.content;
  const category = req.body.category;
  const location = req.body.location;
  const aesthetic = req.body.aesthetic;
  const vibes = req.body.vibes;

  const newPost = new Post({
    title,
    description,
    content,
    category,
    location,
    rating: {
      aesthetic,
      vibes
    }
  })

  newPost.save()
    .then(() => res.json({
      Message: 'Post added successfully!',
      newPostID: newPost._id
    }))
    .catch(err => res.status(400).json({ err }));
});

// GET api/posts/:id
// Route to update post
router.put('/:id', (req, res) => {

  const updatedPost = {
    title: req.body.title,
    description: req.body.description,
    content: req.body.content,
    category: req.body.category,
    location: req.body.location,
    rating: {
      aesthetic: req.body.aesthetic,
      vibes: req.body.vibes
    }
  }

  Post.findByIdAndUpdate(req.params.id, updatedPost)
    .then(() => res.json({ Message: 'Post updated successfully!' }))
    .catch(err =>
      res.status(400).json({ Error: err, Description: 'Unable to update post.' })
    );
});

// GET api/posts/:id
// Route to delete post by id
router.delete('/:id', (req, res) => {
  Post.findByIdAndRemove(req.params.id, req.body)
    .then(post => res.json({ Message: 'Post deleted successfully!' }))
    .catch(err => res.status(404).json({ error: 'Unable to delete post.' }));
});

module.exports = router;