const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/articleRoutes");
const app = express();
const cors = require("cors");
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/api/v1", routes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once("open", () => {
  try {
    console.log("Connected to database");
  } catch (err) {
    console.log(err);
  }
});

app.listen(process.env.PORT || 8080, () => {
  console.log("Server is running on port 8080");
});
