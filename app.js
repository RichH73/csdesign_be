const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
// const mongoose = require("mongoose");
// mongoose.set('useCreateIndex', true);
const main = require("./main");
// require("dotenv").config({ path: "/etc/herpSite.env" });
// const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;









// mongoose.connect(
//   `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/herpbook`,  
//   {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true,
//     autoIndex: false
//   },
//   function(err){
//     if(err) console.log('An error has occured', err)
//     console.log('Database Connected')

//   }
//   );
  
var whitelist = ["https://www.herpbook.com", "https://herpbook.com", 'http://localhost:4000', 'http://192.168.0.2:4000', 'http://localhost:5000'];
var corsOptions = {
  origin: whitelist,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));


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

app.use('/', main)


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