const Song = require("../Model/Song");
const cloudinary = require("../Config/cloudinary");
const streamifier = require("streamifier");

// Helper: Upload file to Cloudinary via stream
const streamUpload = (fileBuffer, options) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      options,
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};

// Create Song
exports.createSong = async (req, res) => {
  try {
    const { title, artist, description, type, youtubeLink, isActive } = req.body;

    let fileUrl = "";

    // Upload file to Cloudinary if audio or pdf
    if (req.file && (type === "audio" || type === "pdf")) {
      const resourceType = type === "audio" ? "video" : "raw";
      const originalName = req.file.originalname.replace(/\.[^/.]+$/, "");
      const result = await streamUpload(req.file.buffer, {
        folder: "PBM_Church_Songs",
        resource_type: resourceType,
        public_id: `${originalName}_${Date.now()}`,
        format: type === "pdf" ? "pdf" : undefined,
      });
      fileUrl = result.secure_url;
    }

    const newSong = await Song.create({
      title,
      artist,
      description,
      type,
      fileUrl,
      youtubeLink: type === "youtube" ? youtubeLink : "",
      isActive: isActive !== undefined ? isActive : true,
    });

    res.status(201).json({
      success: true,
      message: "Song created successfully",
      data: newSong,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Songs
exports.getAllSongs = async (req, res) => {
  try {
    const songs = await Song.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: songs.length,
      data: songs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Song
exports.getSongById = async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);

    if (!song) {
      return res.status(404).json({
        success: false,
        message: "Song not found",
      });
    }

    res.status(200).json({
      success: true,
      data: song,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Song
exports.updateSong = async (req, res) => {
  try {
    const { title, artist, description, type, youtubeLink, isActive } = req.body;

    const updatedData = { title, artist, description, type, isActive };

    // If type is youtube, update the link
    if (type === "youtube") {
      updatedData.youtubeLink = youtubeLink;
      updatedData.fileUrl = "";
    }

    // If new file uploaded for audio/pdf
    if (req.file && (type === "audio" || type === "pdf")) {
      const resourceType = type === "audio" ? "video" : "raw";
      const originalName = req.file.originalname.replace(/\.[^/.]+$/, "");
      const result = await streamUpload(req.file.buffer, {
        folder: "PBM_Church_Songs",
        resource_type: resourceType,
        public_id: `${originalName}_${Date.now()}`,
        format: type === "pdf" ? "pdf" : undefined,
      });
      updatedData.fileUrl = result.secure_url;
      updatedData.youtubeLink = "";
    }

    const song = await Song.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!song) {
      return res.status(404).json({
        success: false,
        message: "Song not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Song updated successfully",
      data: song,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Song
exports.deleteSong = async (req, res) => {
  try {
    const song = await Song.findByIdAndDelete(req.params.id);

    if (!song) {
      return res.status(404).json({
        success: false,
        message: "Song not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Song deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
