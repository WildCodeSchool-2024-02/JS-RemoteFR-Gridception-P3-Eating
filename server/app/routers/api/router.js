const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */
const usersRouter = require("./userRouter");

router.use("/user", usersRouter);

const rolesRouter = require("./roleRouter");

router.use("/role", rolesRouter);
/* ************************************************************************* */

module.exports = router;
