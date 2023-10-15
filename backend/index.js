const express = require("express");
const mongoose = require("mongoose");
const schema = require("./controllers/ArticleController");
const app = express();
const cors = require("cors")
require("dotenv").config();

app.use(cors())
app.use(express.json());

app.use("/", (req,res)=>{
  res.send("Hello World")
});

mongoose.connect(process.env.MONGO_URI)
mongoose.connection.once("open", () => {
  try{
    console.log("Connected to database");
  }
catch(err){
  console.log(err);
}
});

app.listen(process.env.PORT||8080, () => {
  console.log("Server is running on port 8080");
});