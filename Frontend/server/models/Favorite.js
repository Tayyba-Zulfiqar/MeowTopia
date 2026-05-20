const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    catId: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

// Ensure a user can only favorite a cat once
favoriteSchema.index({ user: 1, catId: 1 }, { unique: true });

module.exports = mongoose.model('Favorite', favoriteSchema);
