// The Node.js JWT middleware checks that the JWT token received in the http request from the client is valid before allowing access to the API, if the token is invalid a 401 Unauthorized response is returned.
const expressJwt = require('express-jwt');
const config = require('config.json');

module.exports = jwt;

function jwt() {
    const { secret } = config;
    return expressJwt({ secret, algorithms: ['HS256'] }).unless({
        path: [
            // public routes that don't require authentication
            '/users/authenticate'
        ]
    });
}