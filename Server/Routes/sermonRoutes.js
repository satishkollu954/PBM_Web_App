const express = require("express");

const router = express.Router();

const upload = require("../Middleware/upload");

const {
  createSermon,
  getAllSermons,
  updateSermon,
  deleteSermon,
} = require("../Controller/sermonController");

router.post("/create", upload.single("thumbnailImage"), createSermon);

router.get("/all", getAllSermons);

router.put("/update/:id", upload.single("thumbnailImage"), updateSermon);

router.delete("/delete/:id", deleteSermon);

module.exports = router;
