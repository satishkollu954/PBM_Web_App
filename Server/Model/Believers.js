const mongoose = require("mongoose");

const believerSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    pinCode: {
      type: String,
    },

    churchBelongsTo: {
      type: String,
      enum: ["Nagullanka", "Marteru"],
      required: true,
    },

    daysCategory: {
      type: String,
      enum: ["Friday", "Saturday", "Sunday"],
      required: true,
    },

    familyMemberName: {
      type: String,
    },

    photo: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Believer", believerSchema);
