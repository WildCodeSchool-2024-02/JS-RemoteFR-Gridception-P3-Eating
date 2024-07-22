const express = require("express");

const router = express.Router();

const {
  browse,
  readOneById,
  edit,
  add,
  destroyFavorite,
  destroyUser
} = require("../../controllers/favoriteAction");

router.get("/", browse);
router.get("/:id", readOneById);
router.put("/:id", edit);
router.post("/", add);
router.delete("/users/:userId", destroyUser);
router.delete("/:id", destroyFavorite);

module.exports = router;
