/**
 * Add a gitana.json file at the root of your project.
 * Generate API keys from project -> applications 
 */
const config = require('./gitana.json');

const credentials = {
    client: {
        id: config.clientKey,
        secret: config.clientSecret
    },
    auth: {
        tokenHost: config.baseURL
    }
};

const tokenConfig = {
    username: config.username,
    password: config.password 
};

const oauth2 = require('simple-oauth2').create(credentials);

oauth2.ownerPassword
    .getToken(tokenConfig)
    .then((result) => {
        const token = oauth2.accessToken.create(result);
        //The token can be saved locally
        console.log(token);
    });