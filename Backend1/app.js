const express = require('express');
const app = express();
const ConnectDB = require("./utils/db");


const PORT = process.env.PORT || 8000;
app.get("/", (req, res) => {
    console.log("asdf");

  });
  ConnectDB().then(() => {
    app.listen(PORT, () => {
        console.log("asdf");
        res.send('Hello World');
    });
  });
  app.post('/login', (req, res) => {
    res.send('login route 🎉 ');
  });