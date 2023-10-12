module.exports = function (config) {
  require("./../../prototype");
  const express = require("express");
  const router = express.Router();
  const path = require("path");

  const { MongoClient } = require("mongodb");
  const client = new MongoClient(config.mongodb);
  const database = client.db("futures");

  router.get(
    "/report/user/menu",
    wrapAsync(async function (req, res, next) {
      let collection = database.collection("Investors");
      let event = "futures";
      let lastRow = await collection.findOne({ event: event }, { sort: { date: -1, time: -1 } });
      res.send(lastRow);
    })
  );

  router.get("/error", function (req, res, next) {
    throw new Error("에러 발생!!!!!!");
  });

  function wrapAsync(fn) {
    return function (req, res, next) {
      fn(req, res, next).catch(next);
    };
  }

  return router;
};
