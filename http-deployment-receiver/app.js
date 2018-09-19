var fs = require("fs-extra");
var path = require("path");
var tmp = require("tmp");

process.env.PORT = 3000;

var receiver = require("cloudcms-http-deployment-receiver");

var tempDirPath = tmp.dirSync().name;
console.log("Using temp dir: " + tempDirPath);

var _log = function(deploymentPackage, text)
{
    console.log("[" + deploymentPackage._doc + "] " + text);
};

var writeToTemp = function(deploymentPackage, store, entryPath, callback) {

    store.fileStats(entryPath, function(err, stats) {

        // don't deal with directories
        if (stats.directory) {
            return callback();
        }

        // write each file to temp directory
        store.readStream(entryPath, function(err, readStream) {
            var targetFilePath = path.join(tempDirPath, entryPath);

            // ensure the base directory exists
            var baseDir = path.dirname(targetFilePath);
            fs.mkdirsSync(baseDir);

            // copy file using streams
            var writeStream = fs.createWriteStream(targetFilePath);
            readStream.pipe(writeStream).on("finish", function() {
                _log(deploymentPackage, "Write: " + targetFilePath);
                callback();
            });
        });

    })
};

var removeFromTemp = function(deploymentPackage, store, entryPath, callback) {
    var targetFilePath = path.join(tempDirPath, entryPath);
    fs.removeSync(targetFilePath);

    _log(deploymentPackage, "Delete: " + targetFilePath);

    callback();
};

// CALLBACK: a deployment package has arrived and is about to start deploying
receiver.before(function(deploymentPackage, callback) {
    _log(deploymentPackage, "Start processing for package: " + deploymentPackage._doc);

    callback();
});

// CALLBACK: use this to handle custom deployments
receiver.execute(function(deploymentPackage, manifest, store, callback) {

    // show the root directory
    _log(deploymentPackage, "Root Directory:");
    store.listFiles("/", function(err, filenames) {

        for (var i = 0; i < filenames.length; i++) {
            _log(deploymentPackage, " -> " + filenames[i]);
        }

        callback();
    });
});

// CALLBACK: an entry from the deployment is being processed
receiver.entry(function(deploymentPackage, manifest, store, entryPath, callback) {

    // skip root reference
    if (entryPath.length <= 1) {
        return callback();
    }

    if (deploymentPackage.operation === "DEPLOY") {
        writeToTemp(deploymentPackage, store, entryPath, function() {
            callback();
        });
    } else if (deploymentPackage.operation === "UNDEPLOY") {
        removeFromTemp(deploymentPackage, store, entryPath, function() {
            callback();
        });
    }
});

// CALLBACK: deployment has finished for a package
receiver.after(function(deploymentPackage, manifest, store, callback) {
    _log(deploymentPackage, "Finish processing for package: " + deploymentPackage._doc);
    callback();
});

// start receiver
receiver.start(function() {
    console.log("Sample Custom HTTP Deployment Receiver started on port: " + process.env.PORT);
});
