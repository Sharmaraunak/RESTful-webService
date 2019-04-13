let personModel = require("../models/person.model.js");
let express = require("express");
let router = express.Router();

//create a new Person
//POST localhost:5000/Person
router.post("/person", (req, res) => {
  //req.body
  console.log(req.body);
  req.body.age.parseInt();
  req.body.mobile.parseInt();
  console.log(req.body);
  if (!req.body) {
    return res.status(400).send("Request body is missing");
  }
  let model = new personModel(req.body);
  console.log(model);
  model
    .save()
    .then(doc => {
      if (!doc || doc.length === 0) {
        return res.status(500).send(doc);
      }
      res.status(201).send(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

//GET localhost:3000/customer
router.get("/person", (req, res) => {
  //req.body
  if (!req.query.name) {
    return res.status(400).send("Missing Url parameter:name");
  }
  personModel
    .findOne({
      name: req.query.name
    })
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

//PUT localhost:3000/customer
router.put("/customer", (req, res) => {
  //req.body
  if (!req.query.name) {
    return res.status(400).send("Missing Url parameter:email");
  }
  CustomerModel.findOneAndUpdate(
    {
      email: req.query.email
    },
    req.body,
    {
      new: true
    }
  )
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

//DELETE localhost:3000/customer
router.delete("/customer", (req, res) => {
  //req.body
  if (!req.query.email) {
    return res.status(400).send("Missing Url parameter:email");
  }
  CustomerModel.findOneAndRemove({
    email: req.query.email
  })
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
