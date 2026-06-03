const Sermon = require("../Model/Sermon");
const cloudinary = require("../Config/cloudinary");
const streamifier = require("streamifier");

// Create Sermon
exports.createSermon = async (req, res) => {
  try {
    const { title, youtubeLink } = req.body;

    let thumbnailImage = "";

    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "PBM_Sermons",
          },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          },
        );

        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });

      thumbnailImage = result.secure_url;
    }

    const sermon = await Sermon.create({
      title,
      thumbnailImage,
      youtubeLink,
    });

    res.status(201).json({
      success: true,
      message: "Sermon added successfully",
      data: sermon,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Sermons
exports.getAllSermons = async (req, res) => {
  try {
    const sermons = await Sermon.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: sermons.length,
      data: sermons,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Sermon
exports.updateSermon = async (req, res) => {
  try {
    const updatedData = {
      ...req.body,
    };

    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "PBM_Sermons",
          },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          },
        );

        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });

      updatedData.thumbnailImage = result.secure_url;
    }

    const sermon = await Sermon.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!sermon) {
      return res.status(404).json({
        success: false,
        message: "Sermon not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Sermon updated successfully",
      data: sermon,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Sermon
exports.deleteSermon = async (req, res) => {
  try {
    const sermon = await Sermon.findByIdAndDelete(req.params.id);

    if (!sermon) {
      return res.status(404).json({
        success: false,
        message: "Sermon not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Sermon deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
