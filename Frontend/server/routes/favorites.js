const express = require('express');
const router = express.Router();
const Favorite = require('../models/Favorite');
const { protect } = require('../middleware/auth');

// GET /api/favorites — get all favorite cat IDs for the logged-in user
router.get('/', protect, async (req, res) => {
  try {
    const favorites = await Favorite.find({ user: req.user._id });
    const catIds = favorites.map((f) => f.catId);
    res.json({ catIds });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch favorites' });
  }
});

// POST /api/favorites/:catId — add a cat to favorites
router.post('/:catId', protect, async (req, res) => {
  const catId = parseInt(req.params.catId);
  try {
    const existing = await Favorite.findOne({ user: req.user._id, catId });
    if (existing) {
      return res.status(409).json({ message: 'Cat is already in favorites' });
    }
    await Favorite.create({ user: req.user._id, catId });
    res.status(201).json({ message: 'Added to favorites', catId });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add favorite' });
  }
});

// DELETE /api/favorites/:catId — remove a cat from favorites
router.delete('/:catId', protect, async (req, res) => {
  const catId = parseInt(req.params.catId);
  try {
    await Favorite.findOneAndDelete({ user: req.user._id, catId });
    res.json({ message: 'Removed from favorites', catId });
  } catch (error) {
    res.status(500).json({ message: 'Failed to remove favorite' });
  }
});

module.exports = router;
