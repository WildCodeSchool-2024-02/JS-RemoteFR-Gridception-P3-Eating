const express = require("express");

const router = express.Router();

const {
  browse,
  read,
  edit,
  add,
  destroy,
  readByFavoriteId
} = require("../../controllers/favoriteAction");

router.get("/", browse);
router.get("/:id", read);
router.get("/favorite/:id", readByFavoriteId);
router.put("/:id", edit);
router.post("/", add);
router.delete("/users/:userId", destroy);


module.exports = router;
