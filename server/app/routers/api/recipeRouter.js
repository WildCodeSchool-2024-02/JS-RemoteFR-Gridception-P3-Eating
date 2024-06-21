const express = require("express");

const router = express.Router();

const { read, readOneById } = require("../../controllers/recipeActions");

router.get("/", read);

router.get("/:id", readOneById);

module.exports = router;
