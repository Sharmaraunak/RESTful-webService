var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/RESTfulService", {
  useNewUrlParser: true
});

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  // we're connected!
});

let personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20
  },
  Age: {
    type: Number
    //required: true
  },
  Gender: {
    type: String
    //required: true
  },
  Mobilenumber: {
    type: Number
    //required: true
  }
});

module.exports = mongoose.model("Person", personSchema);
