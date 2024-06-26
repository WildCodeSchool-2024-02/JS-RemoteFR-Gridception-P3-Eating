const express = require("express");

const router = express.Router();

const { browse, read, edit, add, deleteIngredient } = require("../../controllers/ingredientActions");

router.get("/", browse);
router.get("/:id", read);
router.put("/:id", edit);
router.post("/", add);
router.delete("/:id", deleteIngredient);

module.exports = router;
