const express = require("express");

const router = express.Router();

const {
  read,
  readOneById,
  add,
  destroy,
} = require("../../controllers/favoriteAction");

router.get("/", read);
router.get("/:id", readOneById);
router.post("/", add);
router.delete("/:userId", destroy);

module.exports = router;
