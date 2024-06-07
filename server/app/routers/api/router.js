const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */
const usersRouter = require("./usersRouter");

router.use("/users", usersRouter);

const rolesRouter = require("./rolesRouter");

router.use("/roles", rolesRouter);
/* ************************************************************************* */

module.exports = router;
