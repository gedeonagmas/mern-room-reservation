const jwt = require("jsonwebtoken");
const Booking = require("../models/Booking");

async function createBooking(req, res) {
  const { place, checkIn, checkOut, numberOfGuests, name, phone, price } =
    req.body;

  const { token } = req.cookies;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
      if (err) throw err;
      const { id } = userData;

      const newBooking = await Booking.create({
        place,
        checkIn,
        checkOut,
        numberOfGuests,
        name,
        phone,
        price,
        user: id,
      });
      res.json(newBooking);
    });
  } else {
    res.status(401).json("Cannot find the token");
  }
}

module.exports = { createBooking };
