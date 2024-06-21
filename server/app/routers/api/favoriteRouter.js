const express = require("express");

const router = express.Router();

const {
  read,
  readOneById,
  add,
  deleteFav,
} = require("../../controllers/favoriteAction");

router.get("/", read);
router.get("/:id", readOneById);
router.post("/", add);
router.delete("/", deleteFav);

module.exports = router;
