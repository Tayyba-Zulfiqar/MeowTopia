const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect } = require('../middleware/auth');

// GET /api/adoptions — get all adopted cat IDs for the logged-in user
router.get('/', protect, async (req, res) => {
  try {
    res.json({ catIds: req.user.adoptions || [] });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch adoptions' });
  }
});

// POST /api/adoptions/:catId — adopt a cat
router.post('/:catId', protect, async (req, res) => {
  const catId = parseInt(req.params.catId);
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (user.adoptions.includes(catId)) {
      return res.status(409).json({ message: 'Cat is already adopted' });
    }
    await User.findByIdAndUpdate(req.user._id, { $addToSet: { adoptions: catId } });
    res.status(201).json({ message: 'Cat adopted successfully', catId });
  } catch (error) {
    res.status(500).json({ message: 'Failed to adopt cat' });
  }
});

module.exports = router;
