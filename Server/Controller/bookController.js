const Book = require("../Model/Book");

const cloudinary = require("../Config/cloudinary");

const streamifier = require("streamifier");

// Create Book
exports.createBook = async (req, res) => {
  try {
    const { title, subtitle, author, topic, year } = req.body;

    // Create Empty Book First
    const newBook = await Book.create({
      title,
      subtitle,
      author,
      topic,
      year,
    });

    let coverUrl = "";

    // Upload Image
    if (req.file) {
      const streamUpload = () => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: "PBM_Church_Books",
            },

            (error, result) => {
              if (result) {
                resolve(result);
              } else {
                reject(error);
              }
            },
          );

          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });
      };

      const result = await streamUpload();

      coverUrl = result.secure_url;

      // Update Book Cover
      newBook.cover = coverUrl;

      await newBook.save();
    }

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: newBook,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: books.length,
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Book
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Book
exports.updateBook = async (req, res) => {
  try {
    const updatedData = {
      ...req.body,
    };

    // Upload New Cover
    if (req.file) {
      const streamUpload = () => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: "PBM_Church_Books",
            },

            (error, result) => {
              if (result) {
                resolve(result);
              } else {
                reject(error);
              }
            },
          );

          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });
      };

      const result = await streamUpload();

      updatedData.cover = result.secure_url;
    }

    const book = await Book.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: book,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Book
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
