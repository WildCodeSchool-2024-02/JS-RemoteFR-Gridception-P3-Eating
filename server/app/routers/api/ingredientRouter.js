const express = require("express");

const router = express.Router();

const {
  browse,
  read,
  edit,
  add,
  deleteRecipe,
} = require("../../controllers/ingredientActions");

router.get("/", browse);
router.get("/:id", read);
router.put("/:id", edit);
router.post("/", add);
router.delete("/:id", deleteRecipe);

module.exports = router;
