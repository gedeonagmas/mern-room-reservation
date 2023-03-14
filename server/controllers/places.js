const jwt = require("jsonwebtoken");
const Place = require("../models/Place");

function createPlace(req, res) {
  const { token } = req.cookies;

  const {
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
      if (err) throw err;
      const newPlace = await Place.create({
        owner: userData.id,
        title,
        address,
        photos: addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      });
      res.json(newPlace);
    });
  } else {
    res.status(401).json("Cannot find the token");
  }
}

async function getPlaceById(req, res) {
  try {
    const { id } = req.params;
    const place = await Place.findById(id);
    res.json(place);
  } catch (err) {
    res.status(404).json("Cannot find the place");
  }
}

async function updatePlace(req, res) {
  const { token } = req.cookies;

  const {
    id,
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
      if (err) throw err;
      const updatedPlace = await Place.findById(id);
      // console.log(userData.id);
      // console.log(updatedPlace.owner);
      if (userData.id === updatedPlace.owner.toString()) {
        updatedPlace.set({
          title,
          address,
          photos: addedPhotos,
          description,
          perks,
          extraInfo,
          checkIn,
          checkOut,
          maxGuests,
          price,
        });
        await updatedPlace.save();
        res.json("Update Successfully");
      }
    });
  } else {
    res.status(401).json("Cannot find the token");
  }
}

async function getAllPlaces(req, res) {
  const places = await Place.find({});
  res.json(places);
}

module.exports = { createPlace, getPlaceById, updatePlace, getAllPlaces };
