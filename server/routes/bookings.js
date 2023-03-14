const express = require("express");
const { createBooking } = require("../controllers/bookings");

const router = express.Router();

router.route("/").post(createBooking);

module.exports = router;
