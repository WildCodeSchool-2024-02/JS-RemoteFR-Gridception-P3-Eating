const express = require("express");

const router = express.Router();

const {
  browse,
  readOneById,
  add,
  edit,
  deleteRecipe,
} = require("../../controllers/recipeActions");

router.get("/", browse);
router.get("/:id", readOneById);
router.post("/", add);
router.put("/:id", edit);
router.delete("/:id", deleteRecipe);

module.exports = router;