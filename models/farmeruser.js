const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');
const Joi = require('joi');

const farmeruserSchema = new mongoose.Schema({
    farmername: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
      },     
      phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 20
      },
 
      email: {
        type: String,
        minlength: 10,
        maxlength: 255,
        required: true,
        lowercase: true,
        unique: true
      },
      password: {
          type: String,
          required: true,
          minlength:8,
          maxlength:224
      },
      isAdmin: Boolean,
});
farmeruserSchema.methods.generateAuthToken = function() {
  const token = jwt.sign(
    { _id: this._id},
    config.get('jwtPrivateKey')
  );
  return token;

  // return jwt.sign(
  //   { _id: this._id, isAdmin: this.isAdmin },
  //   config.get('jwtPrivateKey')
  // );

};


const Farmeruser = mongoose.model('Farmeruser', farmeruserSchema);

function validateFarmeruser(value) {
  const schema = {
    farmername: Joi.string().min(3).max(50).required(),
    phone: Joi.string().min(5).max(20).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
  };
  return Joi.validate(value, schema);
}

exports.Farmeruser = Farmeruser;
exports.validate = validateFarmeruser;
