let express = require("express");
let app = express();
let path = require("path");
let personRoute = require("./routes/person.js");
let bodyParser = require("body-parser");

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(personRoute);
app.use((req, res, next) => {
  console.log(`${new Date().toString()}=>${req.originalUrl}`, req.body);
  next();
});
app.use((req, res, next) => {
  res.status(404).send("Lost");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.sendFile(path.join(__dirname, "../public/500.html"));
});

const port = process.env.port || 5000;
app.listen(port, () => console.info(`Server has started on ${port}`));
