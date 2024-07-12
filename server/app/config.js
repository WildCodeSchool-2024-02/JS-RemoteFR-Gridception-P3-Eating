const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(
  cors({
    origin: [process.env.CLIENT_URL],
  })
);

app.use(express.json());
const apiRouter = require("./routers/api/router");

app.use("/api", apiRouter);


const reactBuildPath = path.join(__dirname, "/../../client/dist");
const publicFolderPath = path.join(__dirname, "/../public");

// Serve react resources

app.use(express.static(reactBuildPath));

// Serve server resources

app.get("*.*", express.static(publicFolderPath, { maxAge: "1y" }));

// Redirect unhandled requests to the react index file

app.get("*", (_, res) => {
  res.sendFile(path.join(reactBuildPath, "/index.html"));
});

module.exports = app;
