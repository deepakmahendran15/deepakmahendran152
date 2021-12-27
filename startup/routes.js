const express = require("express");
const farmers = require('../routes/farmers');
const farmerusers = require("../routes/farmerusers");

const error = require('../middleware/error');


module.exports = function(app) {
app.use(express.json());
app.use('/api/farmers', farmers);
app.use('/api/farmerusers', farmerusers);

// app.use(function(err, req, res, next) {
//     // Log the exeception
//     res.status(500).send("Something failed.");
// })

app.use(error); // we are not calling this function, simply passing reference to the function.
}