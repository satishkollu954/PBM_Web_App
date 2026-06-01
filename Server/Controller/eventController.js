const Event = require("../Model/Event");
const cloudinary = require("../Config/cloudinary");
const streamifier = require("streamifier");

exports.createEvent = async (req, res) => {
  try {
    const { title, description, startDate, endDate, isActive } = req.body;

    let bannerImage = "";
    let songSheetPdf = "";

    // Banner Upload
    if (req.files?.bannerImage?.[0]) {
      const bannerResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "PBM_Events/Banners",
          },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          },
        );

        streamifier
          .createReadStream(req.files.bannerImage[0].buffer)
          .pipe(stream);
      });

      bannerImage = bannerResult.secure_url;
    }

    // PDF Upload
    if (req.files?.songSheetPdf?.[0]) {
      const pdfResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "PBM_Events/PDFs",
            resource_type: "raw",
          },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          },
        );

        streamifier
          .createReadStream(req.files.songSheetPdf[0].buffer)
          .pipe(stream);
      });

      songSheetPdf = pdfResult.secure_url;
    }

    const event = await Event.create({
      title,
      description,
      bannerImage,
      songSheetPdf,
      startDate,
      endDate,
      isActive,
    });

    res.status(201).json({
      success: true,
      message: "Event created successfully",
      data: event,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getActiveEvents = async (req, res) => {
  try {
    const today = new Date();

    console.log("Today:", today);

    const events = await Event.find({
      isActive: true,
      startDate: {
        $lte: today,
      },
      endDate: {
        $gte: today,
      },
    });

    console.log("Events:", events);

    res.status(200).json({
      success: true,
      data: events,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: events.length,
      data: events,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const updatedData = {
      ...req.body,
    };

    // Banner Upload
    if (req.files?.bannerImage?.[0]) {
      const bannerResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "PBM_Events/Banners",
          },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          },
        );

        streamifier
          .createReadStream(req.files.bannerImage[0].buffer)
          .pipe(stream);
      });

      updatedData.bannerImage = bannerResult.secure_url;
    }

    // PDF Upload
    if (req.files?.songSheetPdf?.[0]) {
      const pdfResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "PBM_Events/PDFs",
            resource_type: "raw",
          },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          },
        );

        streamifier
          .createReadStream(req.files.songSheetPdf[0].buffer)
          .pipe(stream);
      });

      updatedData.songSheetPdf = pdfResult.secure_url;
    }

    const event = await Event.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Event updated successfully",
      data: event,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
