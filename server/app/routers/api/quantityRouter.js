const express = require("express");

const router = express.Router();

const { browse, readOneById, readByRecipeId, edit, add, deleteQuantity } = require("../../controllers/quantityActions");

router.get("/", browse);
router.get("/:id", readOneById);
router.get("/recipe/:id", readByRecipeId);
router.put("/:id", edit);
router.post("/", add);
router.delete("/:id", deleteQuantity);

module.exports = router;