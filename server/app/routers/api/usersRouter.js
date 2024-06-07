const express = require("express");

const router = express.Router();

//CRUD- BREAD

const { read, readOneById } = require("../../controllers/usersActions");

router.get("/", read);

router.get("/:id", readOneById);

module.exports = router;
