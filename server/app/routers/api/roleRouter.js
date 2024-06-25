const express = require("express");

const router = express.Router();

const { read, readOneById, add } = require("../../controllers/roleActions");

router.get("/", read);

router.get("/:id", readOneById);

router.post("/", add);

module.exports = router;
