const { Farmer, validate, Farmeruser } = require("../models/farmeruser");
const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const config = require('config');

const auth = require("../middleware/auth");

router.get("/me", auth, async (req, res) => {
  const farmer = await Farmeruser.findById(req.farmer._id).select("-password");
  res.send(farmer);
});

router.post("/", async (req, res) => {
 const { error } = validate(req.body);
 if (error) return res.status(400).send(error.details[0].message);
 let farmer = await Farmeruser.findOne({ email:req.body.email });
 if (farmer) return res.status(400).send("User already registered.");
//  user = new User({
//  name: req.body.name,
//  email: req.body.email,
//  password: req.body.password
//  });
farmer = new Farmeruser(_.pick(req.body,  ["farmername","phone", "email", "password"]));
     const salt = await bcrypt.genSalt(10);
     farmer.password = await bcrypt.hash(farmer.password, salt);

     await farmer.save();
// //  res.send(user);
// // res.send({
// //     name: user.name,
// //     email: user.email
// //     });
// res.send(_.pick(user, ["_id", "name", "email"]));
// console.log(user)

// const token = jwt.sign({ _id: user._id}, config.get('jwtPrivateKey'));
// res
// .header("x-auth-token",token)
// .send(_.pick(user, ["_id", "name", "email"]));
// console.log(user)

const token = farmer.generateAuthToken();
  res
    .header("x-auth-token", token)
    .send(_.pick(farmer, ["_id", "farmername", "email"]));



});
module.exports = router;