const express = require("express");
const router = express.Router();

const { getData, postData, getSingleData } = require("../controllers/trackingController");

router.get("/getdata", getData);
router.post("/postdata", postData);
router.get("/getdata/:mediaType/:mal_id",getSingleData);

module.exports = router;
