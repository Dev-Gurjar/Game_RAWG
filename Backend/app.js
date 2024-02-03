console.log("0");

require('dotenv').config();
console.log("1");

const express = require("express");
console.log("2");
const cors = require('cors');
console.log("3");
// console.log(process.env)
const app = express();
console.log("4");

const ConnectDB = require("./utils/db");
console.log("5");
const routes = require("./routers/routes");
const xhomeroute = require("./routers/x-Home");
console.log("6");
const xcatatoryroute = require("./routers/x-Catagories");
console.log("7");

app.use(express.json());
console.log("8");
// app.use(cors());
app.use(cors({
  origin: ['http://172.31.47.98:5000',"https://game-rawg-iota.vercel.app"],
  methods:["POST","GET"],
  credentials: true
 }));
 console.log("9");

app.use("/", routes);
app.use("/", xhomeroute);
app.use("/", xcatatoryroute);
console.log("10");

const PORT = process.env.PORT || 8000;
// const localIpAddress = "172.31.47.98";
console.log("11");

app.get("/", (req, res) => {
  res.send("Chal jayega bhai");
});
console.log("12");
ConnectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server has Started at ${PORT}`);
  });
});
console.log("13");
