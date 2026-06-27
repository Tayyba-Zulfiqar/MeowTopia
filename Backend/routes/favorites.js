const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect } = require('../middleware/auth');

// GET /api/favorites — get all favorite cat IDs for the logged-in user
router.get('/', protect, async (req, res) => {
  try {
    res.json({ catIds: req.user.favorites || [] });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch favorites' });
  }
});

// POST /api/favorites/:catId — add a cat to favorites
router.post('/:catId', protect, async (req, res) => {
  const catId = parseInt(req.params.catId);
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (user.favorites.includes(catId)) {
      return res.status(409).json({ message: 'Cat is already in favorites' });
    }
    await User.findByIdAndUpdate(req.user._id, { $addToSet: { favorites: catId } });
    res.status(201).json({ message: 'Added to favorites', catId });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add favorite' });
  }
});

// DELETE /api/favorites/:catId — remove a cat from favorites
router.delete('/:catId', protect, async (req, res) => {
  const catId = parseInt(req.params.catId);
  try {
    await User.findByIdAndUpdate(req.user._id, { $pull: { favorites: catId } });
    res.json({ message: 'Removed from favorites', catId });
  } catch (error) {
    res.status(500).json({ message: 'Failed to remove favorite' });
  }
});

module.exports = router;
