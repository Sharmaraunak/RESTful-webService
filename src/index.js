let express = require("express");
let app = express();
let path = require("path");
let personRoute = require("./routes/person");
let bodyParser = require("body-parser");

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header("Acess-Control-Allow-Origin", "*");
  res.header(
    "Acess-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Allow-Control-Allow-Headers", "PUT,POST,DELETE,GET");
    return res.status(200).json({});
  }
});
app.use(personRoute);
app.use((req, res, next) => {
  console.log(`${new Date().toString()}=>${req.originalUrl}`, req.body);
  next();
});
app.use((req, res, next) => {
  const error = new Error("Not foumd");
  error.status(404);
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

const port = process.env.port || 5000;
app.listen(port, () => console.info(`Server has started on ${port}`));
