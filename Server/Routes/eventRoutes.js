const express = require("express");

const router = express.Router();

const upload = require("../Middleware/upload");

const {
  createEvent,
  getAllEvents,
  getActiveEvents,
  updateEvent,
  deleteEvent,
} = require("../Controller/eventController");

router.post(
  "/create",
  upload.fields([
    {
      name: "bannerImage",
      maxCount: 1,
    },
    {
      name: "songSheetPdf",
      maxCount: 1,
    },
  ]),
  createEvent,
);

router.get("/all", getAllEvents);

router.get("/active", getActiveEvents);

router.put(
  "/update/:id",
  upload.fields([
    {
      name: "bannerImage",
      maxCount: 1,
    },
    {
      name: "songSheetPdf",
      maxCount: 1,
    },
  ]),
  updateEvent,
);

router.delete("/delete/:id", deleteEvent);

module.exports = router;
