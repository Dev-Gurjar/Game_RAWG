require('dotenv').config();
const express = require("express");
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

const port = process.env.PORT || 1000;
// const localIpAddress = "172.31.47.98";

app.get("/", (req, res) => {
  console.log("regester");
  res.send("Chal jayega bhai");
});
ConnectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server has Started at ${port}`);
  });
});