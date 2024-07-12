const express = require("express");

const router = express.Router();

const {
  browse,
  read,
  readByRecipeId,
  edit,
  editByRecipeAndIngredient,
  add,
  deleteQuantity,
} = require("../../controllers/quantityActions");

router.get("/", browse);
router.get("/:id", read);
router.get("/recipe/:id", readByRecipeId);
router.put("/:id", edit);
router.put("/quantities/:recipe_id/:ingredient_id", editByRecipeAndIngredient);
router.post("/", add);
router.delete("/:id", deleteQuantity);

module.exports = router;
