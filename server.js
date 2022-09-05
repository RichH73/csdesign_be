const http = require("http"),
  fs = require("fs"),
  port = 4000,
  app = require('./app')



http.createServer(app).listen(port, () => console.log(`Node Server listening on HTTP port: ${port}`))

