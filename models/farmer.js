const mongoose = require('mongoose');
const Joi = require("joi");



const farmerSchema =  new mongoose.Schema ({
    farmername: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50
    },
   
    productname: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50
    },
    producttype:{
      type: String,
      required: true,
      enum: ['natural', 'artificial'],
      lowercase: true,
     // uppercase: true,
      trim: true,
    },
   date: { type: Date, default: Date.now },
    isPublished: {
      type: Boolean,
      default: false
    },
    location: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20
    },
  
    priceperkg:  {
      type: Number,
       required: function () {
         return this.isPublished ;
       },
       min:5,
       max:1000,
       get: v => Math.round(v),
       set: v => Math.round(v),
    },
    phone: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 20
    },
    aadharnumber: {
      type: String,
      required: true,
      length: 16
    },
  
  });

  const Farmer = mongoose.model('Farmer', farmerSchema);

  function validateFarmer(farmer) {
    const schema = {
       farmername: Joi.string().min(3).max(50).required(),
      productname: Joi.string().min(3).max(50).required(),
      producttype: Joi.string().min(3).max(10).required(),
      isPublished: Joi.boolean(),
      location: Joi.string().min(3).max(20).required(),
      priceperkg: Joi.string().min(5).max(1000).required(),
      phone: Joi.string().min(5).max(20).required(),
      aadharnumber: Joi.string().length(16).required(),
      
    };
    return Joi.validate(farmer, schema);
  }

  
exports.farmerSchema = farmerSchema;
exports.Farmer = Farmer;
exports.validate = validateFarmer; 
 