require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');

// console.log(process.env)
const app = express();

const ConnectDB = require("./utils/db");
const routes = require("./routers/routes");
const xhomeroute = require("./routers/x-Home");
const xcatatoryroute = require("./routers/x-Catagories");

app.use(express.json());

app.use(cors({
  origin: ['http://172.31.47.98:5000',"https://game-rawg.onrender.com"],
  methods:["POST","GET"],
  credentials: true
 }));

app.use("/", routes);
app.use("/", xhomeroute);
app.use("/", xcatatoryroute);

const port = process.env.PORT || 10000;
// const localIpAddress = "172.31.47.98";

app.get("/", (req, res) => {
  console.log("regester");
  res.send("Chal jayega bhai");
});


const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  })
  .catch((err) => console.log(err));

