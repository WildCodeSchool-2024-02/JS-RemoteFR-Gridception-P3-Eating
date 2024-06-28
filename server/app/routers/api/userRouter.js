const express = require("express");

const router = express.Router();

const {
  browse,
  readOneById,
  add,
  login,
  register,
  edit,
  destroy,
} = require("../../controllers/userActions");

router.get("/", browse);

router.get("/:id", readOneById);

router.post("/", add);

router.post("/login",login);

router.post("/register", register)

router.put("/:id", edit);

router.delete("/:id", destroy);

module.exports = router;
