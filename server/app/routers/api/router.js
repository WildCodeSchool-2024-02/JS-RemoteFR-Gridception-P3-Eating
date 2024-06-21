const express = require("express");

const router = express.Router();

const categoryRouter = require("./categoryRouter");
const ingredientRouter = require("./ingredientRouter");
const userRouter = require("./userRouter");
const roleRouter = require("./roleRouter");
const favoriteRouter = require("./favoriteRouter");
const quantityRouter = require("./quantityRouter");
const recipeRouter = require("./recipeRouter");

router.use("/categories", categoryRouter);
router.use("/ingredients", ingredientRouter);
router.use("/users", userRouter);
router.use("/roles", roleRouter);
router.use("/favorites", favoriteRouter);
router.use("/quantities", quantityRouter);
router.use("/recipes", recipeRouter);
/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */

/* ************************************************************************* */

module.exports = router;
