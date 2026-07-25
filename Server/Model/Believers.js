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

    age: {
      type: Number,
      required: true,
      min: 0,
      max: 120,
    },

    gender: {
      type: String,
      enum: ["male", "female"],
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
