const express = require("express");
const { saveLocation } = require("../controllers/location.controllers");
const router = express.Router();

// Save Location
router.post("/share", saveLocation);

module.exports = router;
