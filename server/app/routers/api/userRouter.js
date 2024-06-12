const express = require("express");

const router = express.Router();

const { read, readOneById } = require("../../controllers/userActions");

router.get("/", read);

router.get("/:id", readOneById);

module.exports = router;
