const mongoose = require('mongoose');
const Joi = require("joi");
const express = require("express");
const router = express.Router();
const {Farmer, validate} = require('../models/farmer');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const Farmeruse = require('../models/farmeruser');


router.get("/", async (req, res) => {
    const farmers = await Farmer.find().sort('name');
    res.send(farmers);
  });
  
  router.get("/:id", async (req, res) => {
    const farmer = await Farmer.findById(req.params.id);
  
    if (!farmer)
      return res.status(404).send("The farmer with the given ID was not found");
    res.send(farmer);
  });

  
router.post("/", auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  
    let farmer = new Farmer({ 
        farmername: req.body.farmername,
        productname: req.body.productname,
        producttype: req.body.producttype,
        isPublished: req.body.isPublished,
        location: req.body.location,
        priceperkg: req.body.priceperkg,
        phone: req.body.phone,
        aadharnumber: req.body.aadharnumber,
      });
    farmer = await farmer.save();
    res.send(farmer);
  });

  router.put("/:id",[auth, admin], async (req, res) => {

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  
    const farmer = await Farmer.findByIdAndUpdate(req.params.id, 
      { 
         farmername: req.body.farmername,
         productname: req.body.productname,
         producttype: req.body.producttype,
         isPublished: req.body.isPublished,
         location: req.body.location,
         priceperkg: req.body.priceperkg,
         phone: req.body.phone,
         aadharnumber: req.body.aadharnumber,
      }, { new: true });
  
    if (!farmer)
      return res.status(404).send("The farmer with the given ID was not found");
  
    res.send(farmer);
  });

  router.delete("/:id", [auth, admin], async (req, res) => {
  
    const farmer = await Farmer.findByIdAndRemove(req.params.id);
  
    if (!farmer)
      return res.status(404).send("The farmer with the given ID  was not found");
  
    res.send(farmer);
  });

  
  module.exports = router;
  