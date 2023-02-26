const express= require('express');
const router = express.Router();
const feedController = require("../controller/controller");
router.get("/getSearchGraphData", feedController.getGraphDataPost); /* GET FOR FETCHING GRAPH DATA */
router.get("/getSearchData", feedController.getDailyDataPost); /* GET FOR FETCHING TABLE DATA */
router.post("/postSearchGraphData", feedController.createGraphDataPost); /* POST FOR FETCHING GRAPH DATA */
router.post("/postSearchData", feedController.createDailyDataPost) /* POST FOR FETCHING TABLE DATA */
module.exports = router;