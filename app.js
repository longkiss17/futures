const express = require("express");
const app = express();
const http = require("http");
const path = require("path");
const port = 80;
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const fileUpload = require("express-fileupload");
const server = http.createServer(app);
console.log(process.env.NODE_ENV);

let config = require("./config.json")[process.env.NODE_ENV];

(async () => {
  if (process.env.NODE_ENV === "production") {
    config.cybos.pwd = process.argv[3];
  }

  app.set("views", path.join(__dirname, "views"));
  app.set("view engine", "jade");

  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, "backend/public")));
  app.use(fileUpload());

  app.use("/assets", express.static("./backend/public/assets"));
  app.use("/api", require("./backend/routes/apis-get")(config));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./backend/public", "index.html"));
  });

  app.use(function (error, req, res, next) {
    res.status(503).json({ message: error.message });
  });

  http.createServer(app).listen(port, function () {
    console.log("Http server listening on port " + port);
  });
})();
