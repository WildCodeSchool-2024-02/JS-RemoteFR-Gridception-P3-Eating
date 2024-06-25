const express = require("express");

const router = express.Router();


const { browse, readOneById, add, edit } = require("../../controllers/recipeActions");

router.get("/", browse);
router.get("/:id", readOneById);
router.post("/", add);
router.put("/:id", edit);


module.exports = router