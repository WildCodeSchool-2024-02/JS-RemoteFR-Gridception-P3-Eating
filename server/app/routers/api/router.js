const express = require("express");

const router = express.Router();

const categoryRouter = require("./categoryRouter");
const ingredientRouter = require("./ingredientRouter");

router.use("/category", categoryRouter);
router.use("/ingredient", ingredientRouter);


module.exports = router;
