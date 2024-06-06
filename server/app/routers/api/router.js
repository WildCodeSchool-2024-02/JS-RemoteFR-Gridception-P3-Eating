const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */

const recipeRouter = require("./recipeRouter");

router.use("/recipe", recipeRouter);

/* ************************************************************************* */

module.exports = router;