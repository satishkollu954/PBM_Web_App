const express = require("express");

const router = express.Router();

const upload = require("../Middleware/upload");

const {
  createBeliever,
  getAllBelievers,
  getBelieverById,
  updateBeliever,
  deleteBeliever,
} = require("../Controller/believerController");

// Create Believer
router.post("/create", upload.single("photo"), createBeliever);

// Get All Believers
router.get("/all", getAllBelievers);

// Get Single Believer
router.get("/:id", getBelieverById);

// Update Believer
router.put("/update/:id", upload.single("photo"), updateBeliever);

// Delete Believer
router.delete("/delete/:id", deleteBeliever);

module.exports = router;
