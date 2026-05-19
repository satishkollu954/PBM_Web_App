const Believer = require("../Model/Believers");
const cloudinary = require("../Config/cloudinary");
const streamifier = require("streamifier");
// Create Believer
exports.createBeliever = async (req, res) => {
  try {
    let photoUrl = "";

    // Upload Image to Cloudinary
    if (req.file) {
      const streamUpload = (req) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: "PBM_Church_Believers",
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

      const result = await streamUpload(req);

      photoUrl = result.secure_url;
    }

    const {
      firstName,
      lastName,
      phoneNumber,
      gender,
      address,
      pinCode,
      churchBelongsTo,
      daysCategory,
      familyMemberName,
    } = req.body;

    const believer = await Believer.create({
      firstName,
      lastName,
      phoneNumber,
      gender,
      address,
      pinCode,
      churchBelongsTo,
      daysCategory,
      familyMemberName,
      photo: photoUrl,
    });

    res.status(201).json({
      success: true,
      message: "Believer created successfully",
      data: believer,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Believers
exports.getAllBelievers = async (req, res) => {
  try {
    const believers = await Believer.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: believers.length,
      data: believers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Believer
exports.getBelieverById = async (req, res) => {
  try {
    const believer = await Believer.findById(req.params.id);

    if (!believer) {
      return res.status(404).json({
        success: false,
        message: "Believer not found",
      });
    }

    res.status(200).json({
      success: true,
      data: believer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Believer
exports.updateBeliever = async (req, res) => {
  try {
    const updatedData = {
      ...req.body,
    };

    if (req.file) {
      updatedData.photo = req.file.path;
    }

    const believer = await Believer.findByIdAndUpdate(
      req.params.id,
      updatedData,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!believer) {
      return res.status(404).json({
        success: false,
        message: "Believer not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Believer updated successfully",
      data: believer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Believer
exports.deleteBeliever = async (req, res) => {
  try {
    const believer = await Believer.findByIdAndDelete(req.params.id);

    if (!believer) {
      return res.status(404).json({
        success: false,
        message: "Believer not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Believer deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
