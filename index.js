const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
// app.use(express.static(__dirname + '/public'));
// app.use(express.static(path.join(__dirname, 'client', 'public')));
// console.log(`Dirrrrrr: ${path.join(__dirname, 'client', 'public')}`);
app.get("/api/server", function(req, res) {
  res.json({ id: "123" });
  res.end();
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/public"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "public", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT);
