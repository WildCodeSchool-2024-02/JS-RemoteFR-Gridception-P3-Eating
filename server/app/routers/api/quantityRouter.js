const express = require("express");

const router = express.Router();

const {
  read,
  readOneById,
  readByRecipeId,
} = require("../../controllers/quantityActions");

router.get("/", read);

router.get("/:id", readOneById);
router.get("/recipe/:id", readByRecipeId);

module.exports = router;
