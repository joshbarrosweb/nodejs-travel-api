const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();

const pinRoutes = require("./src/routes/pins");
const userRoutes = require("./src/routes/users");

dotenv.config();

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected!");
  })
  .catch((error) => console.log(error));

app.use("/api/pins", pinRoutes);
app.use("/api/users", userRoutes);

app.listen(8888, () => console.log("Backend server is running"));
