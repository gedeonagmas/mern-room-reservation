const express = require("express");
const {
  createPlace,
  getPlaceById,
  updatePlace,
  getAllPlaces,
} = require("../controllers/places");

const router = express.Router();

router.route("/").post(createPlace).put(updatePlace).get(getAllPlaces);
router.get("/:id", getPlaceById);

module.exports = router;
