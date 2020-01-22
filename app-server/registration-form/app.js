var server = require("cloudcms-server/server");

/**
 * This gets displayed once the server starts up.
 */
server.report(function(callback) {
    console.log("");
    console.log("Web Server: http://localhost:" + process.env.PORT);
    console.log("");
    callback();
});

/**
 * Start the Server
 */
server.start({
    "setup": "single",
    "welcome": {
        "enabled": true,
        "file": "index.html"
    },
    "serverTags": {
        "enabled": true
    }
});
