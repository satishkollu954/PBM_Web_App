const express = require("express");
const router = express.Router();
const upload = require("../Middleware/upload");
const {
  createSong,
  getAllSongs,
  getSongById,
  updateSong,
  deleteSong,
} = require("../Controller/songController");

router.post("/create", upload.single("file"), createSong);
router.get("/all", getAllSongs);
router.get("/:id", getSongById);
router.put("/update/:id", upload.single("file"), updateSong);
router.delete("/delete/:id", deleteSong);

module.exports = router;
