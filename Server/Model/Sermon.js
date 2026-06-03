const mongoose = require("mongoose");

const sermonSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    thumbnailImage: {
      type: String,
      required: true,
    },

    youtubeLink: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Sermon", sermonSchema);
