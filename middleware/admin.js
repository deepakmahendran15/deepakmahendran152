module.exports = function (req,  res, next) {
    // req.user
    // 401 Unauthorized
    // 403 Forbidden
    if (!req.farmeruser.isAdmin) return res.status(403).send('Access  Denied');
    next(); // here, in this case , middleware router
}