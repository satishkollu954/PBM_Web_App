const express = require("express");

const router = express.Router();

const { loginAdmin } = require("../Controller/authController");

// Login Route
router.post("/login", loginAdmin);

module.exports = router;
