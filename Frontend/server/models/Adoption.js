const mongoose = require('mongoose');

const adoptionSchema = new mongoose.Schema(
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

// A user can only adopt a specific cat once
adoptionSchema.index({ user: 1, catId: 1 }, { unique: true });

module.exports = mongoose.model('Adoption', adoptionSchema);
