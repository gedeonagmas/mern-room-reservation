const express = require("express");
const {
  getUserProfile,
  getUserPlaces,
  getUserBookings,
} = require("../controllers/users");

const router = express.Router();

router.route("/profile").get(getUserProfile);
router.route("/places").get(getUserPlaces);
router.route("/bookings").get(getUserBookings);

module.exports = router;
