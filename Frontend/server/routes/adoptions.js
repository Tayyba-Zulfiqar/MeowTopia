const express = require('express');
const router = express.Router();
const Adoption = require('../models/Adoption');
const { protect } = require('../middleware/auth');

// GET /api/adoptions — get all adopted cat IDs for the logged-in user
router.get('/', protect, async (req, res) => {
  try {
    const adoptions = await Adoption.find({ user: req.user._id });
    const catIds = adoptions.map((a) => a.catId);
    res.json({ catIds });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch adoptions' });
  }
});

// POST /api/adoptions/:catId — adopt a cat
router.post('/:catId', protect, async (req, res) => {
  const catId = parseInt(req.params.catId);
  try {
    const existing = await Adoption.findOne({ user: req.user._id, catId });
    if (existing) {
      return res.status(409).json({ message: 'Cat is already adopted' });
    }
    await Adoption.create({ user: req.user._id, catId });
    res.status(201).json({ message: 'Cat adopted successfully', catId });
  } catch (error) {
    res.status(500).json({ message: 'Failed to adopt cat' });
  }
});

module.exports = router;
