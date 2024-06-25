const express = require("express");

const router = express.Router();

const {
  read,
  readOneById,
  add,
  edit,
  destroy,
} = require("../../controllers/roleActions");

router.get("/", read);

router.get("/:id", readOneById);

router.post("/", add);

router.put("/:id", edit);

router.delete("/:id", destroy);

module.exports = router;
