let personModel = require("../models/person.model.js");
let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

//create a new Person
//POST localhost:5000/Person
router.post("/person", (req, res, next) => {
  //req.body
  if (!req.body) {
    return res.status(400).send("Request body is missing");
  }
  const person = new personModel({
    name: req.body.name,
    age: req.body.age,
    gender: req.body.gender,
    mobile: req.body.mobile
  });
  person
    .save()
    .then(result => {
      console.log(result);
    })
    .catch(err => {
      console.log(json(err));
    });
  res.status(201).json({
    message: "handling POST requests to /person",
    createdPerson: person
  });
});

//GET localhost:3000/customer
router.get("/person", (req, res, next) => {
  //req.body
  //console.log(req.query);
  if (!req.body) {
    return res.status(400).send("Missing Url parameter:name");
  }
  personModel
    .find()
    .then(doc => {
      res.json(doc);
      console.log(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

//PUT localhost:3000/customer
router.put("/person/:id", (req, res, next) => {
  //req.body
  console.log(req.body);
  if (!req.body.name) {
    return res.status(400).send("Missing Url parameter:name");
  }
  personModel
    .findOneAndUpdate(
      {
        name: req.body.name
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

//DELETE localhost:5000/person
router.delete("/person/:id", (req, res, next) => {
  //req.body
  if (!req.body.name) {
    return res.status(400).send("Missing Url parameter:name");
  }
  personModel
    .findOneAndRemove({
      name: req.body.name
    })
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
