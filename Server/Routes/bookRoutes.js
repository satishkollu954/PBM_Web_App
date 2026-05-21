const express = require("express");

const router = express.Router();

const upload = require("../Middleware/upload");

const {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
} = require("../Controller/bookController");

// Create Book
router.post("/create", upload.single("cover"), createBook);

// Get All Books
router.get("/all", getAllBooks);

// Get Single Book
router.get("/:id", getBookById);

// Update Book
router.put("/update/:id", upload.single("cover"), updateBook);

// Delete Book
router.delete("/delete/:id", deleteBook);

module.exports = router;
