const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Place = require("../models/Place");
const Booking = require("../models/Booking");

/* user-profile */
function getUserProfile(req, res) {
  const { token } = req.cookies;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
      if (err) throw err;
      const { _id, name, email } = await User.findById(userData.id);
      res.json({ _id, name, email });
    });
  } else {
    res.status(401).json("Cannot find the token");
  }
}

/* user-places */
function getUserPlaces(req, res) {
  const { token } = req.cookies;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
      if (err) throw err;
      const { id } = userData;
      const places = await Place.find({ owner: id });
      res.json(places);
    });
  } else {
    res.status(401).json("Cannot find the token");
  }
}

/* user-bookings */
function getUserBookings(req, res) {
  const { token } = req.cookies;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
      if (err) throw err;
      const { id } = userData;
      // const bookings = await Booking.find({ user: id }).populate({
      //   path: "place",
      //   populate: { path: "owner" },
      // });
      // const bookings = await Booking.find({ user: id })
      //   .populate("place")
      //   .populate("user");
      const bookings = await Booking.find({ user: id }).populate("place");
      res.json(bookings);
    });
  } else {
    res.status(401).json("Cannot find the token");
  }
}

module.exports = { getUserProfile, getUserPlaces, getUserBookings };
