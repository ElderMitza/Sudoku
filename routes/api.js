"use strict";

const routeController = require("../controllers/route-controller");
const router = require("express").Router();

router.post("/check", routeController.checkPuzzle);
router.post("/solve", routeController.solvePuzzle);

module.exports = router;
