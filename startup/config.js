const config = require('config');
module.exports = function() {
    if (!config.get('jwtPrivateKey')) {
        console.error('FATAL ERROR: jwtPrivateKey is not defined.');
        // process is a global object using exit. here 0 is success other than 0 is error.
        process.exit(1)
    }
}