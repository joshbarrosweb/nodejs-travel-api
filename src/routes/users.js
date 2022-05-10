const router = require("express").Router();
const bcrypt = require("bcrypt");

const User = require("../models/User");

router.post("/register", async (request, response) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(request.body.password, salt);

    const newUser = new User({
      username: request.body.username,
      email: request.body.email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    response.status(200).json(user._id);
  } catch (error) {
    response.status(500).json(error);
  }
});

router.post("/login", async (request, response) => {
  try {
    const user = await User.findOne({ username: request.body.username });
    !user && response.status(400).json("Wrong username or password!");

    const validPassword = await bcrypt.compare(
      request.body.password,
      user.password
    );

    !validPassword && response.status(400).json("Wrong username or password!");

    response.status(200).json({ _id: user._id, username: user.username });
  } catch (error) {
    response.status(500).json(error);
  }
});

module.exports = router;
