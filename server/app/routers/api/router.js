const express = require("express");

const router = express.Router();

const categoryRouter = require("./categoryRouter");
const ingredientRouter = require("./ingredientRouter");
const userRouter = require("./userRouter");
const roleRouter = require("./roleRouter");

router.use("/categories", categoryRouter);
router.use("/ingredients", ingredientRouter);
router.use("/users", userRouter);
router.use("/roles", roleRouter);
/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */

const recipeRouter = require("./recipeRouter");

router.use("/recipe", recipeRouter);

/* ************************************************************************* */

module.exports = router;
