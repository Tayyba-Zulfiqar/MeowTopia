const mongoose = require('mongoose');

const illustrationSchema = new mongoose.Schema(
  {
    primaryColor: String,
    blushColor: String,
    bowColor: String,
    hasBow: Boolean,
    scale: Number,
  },
  { _id: false }
);

const catSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    name: { type: String, required: true },
    breed: { type: String, required: true },
    age: { type: String, required: true },
    tag: { type: String, required: true },
    tagColor: String,
    tagTextColor: String,
    circleBg: String,
    illustration: illustrationSchema,
    description: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Cat', catSchema);
