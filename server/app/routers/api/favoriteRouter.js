const express = require("express");

const router = express.Router();

const {
  browse,
  read,
  edit,
  add,
  deleteFav,
} = require("../../controllers/favoriteAction");

router.get("/", browse);
router.get("/:id", read);
router.put("/:id", edit);
router.post("/", add);
router.delete("/:id", deleteFav);

module.exports = router;
