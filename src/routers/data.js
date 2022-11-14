const express = require("express");
const {
  addData,
  calculateLks,
  calculateOld,
  getData,
} = require("../controllers/data");

const router = express.Router();

router.post("/data", addData);

router.get("/data", getData);

router.post("/data/lks", calculateLks);

router.post("/data/old", calculateOld);

module.exports = router;
