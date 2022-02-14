const express = require("express");
const path = require("path");
const app = express();
//PORT!
const { PORT = 5000 } = process.env;
//MIDDLEWARE
app.use(express.static(path.join(__dirname, "public")));
// ENDPOINT
app.get("/", (req, res) => {
  return res
    .status(200)
    .sendFile(path.join(__dirname, "/public", "index.html"));
});
app.get("*", (req, res) => {
  return res.status(404).send("Nothing here.");
});

// Listen for Traffic!
app.listen(PORT, () => {
  console.log("Started sever on port: " + PORT);
});
