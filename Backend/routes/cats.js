const express = require('express');
const router = express.Router();
const Cat = require('../models/Cat');
const { protect } = require('../middleware/auth');

// GET /api/cats — get all cats (protected)
router.get('/', protect, async (req, res) => {
  try {
    const cats = await Cat.find().sort({ id: 1 });
    res.json(cats);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch cats' });
  }
});

// GET /api/cats/:id — get single cat by numeric id (protected)
router.get('/:id', protect, async (req, res) => {
  try {
    const cat = await Cat.findOne({ id: parseInt(req.params.id) });
    if (!cat) {
      return res.status(404).json({ message: 'Cat not found' });
    }
    res.json(cat);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch cat' });
  }
});

module.exports = router;
