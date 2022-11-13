const express = require("express");
const { addData } = require("../controllers/data");

const router = express.Router();

router.post("/data", addData);

module.exports = router;
