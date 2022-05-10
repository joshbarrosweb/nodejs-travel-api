const router = require("express").Router();

const Pin = require("../models/Pin");

router.post("/", async (request, response) => {
  const newPin = new Pin(request.body);

  try {
    const savedPin = await newPin.save();
    response.status(200).json(savedPin);
  } catch (error) {
    response.status(500).json(error);
  }
});

router.get("/", async (request, response) => {
  try {
    const pins = await Pin.find();
    response.status(200).json(pins);
  } catch (error) {
    response.status(500).json(error);
  }
});

module.exports = router;
