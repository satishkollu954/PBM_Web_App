const express = require("express");

const router = express.Router();

const {
  createContact,
  getAllContacts,
  deleteContact,
} = require("../Controller/contactController");

// Create Contact
router.post("/create", createContact);

// Get All Contacts
router.get("/all", getAllContacts);

// Delete Contact
router.delete("/delete/:id", deleteContact);

module.exports = router;
