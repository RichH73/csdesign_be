const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const main = require("./main");

  
var whitelist = ['http://localhost:4000', 'http://192.168.0.2:4000'];
var corsOptions = {
  origin: whitelist,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// app.use(cors(corsOptions));

app.use(bodyParser.json({
  type: 'application/json',
  limit: "40mb",
}));
app.use(bodyParser.urlencoded({ extended: false, limit: "40mb" }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Reqruested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use('/submit_form', main)


app.use((req, res, next) => {
  const error = new Error("Your request is not found on this server.");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});





module.exports = app;