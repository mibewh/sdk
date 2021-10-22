const trackerFactory = require("./lib/tracker");

var path = require("path");

module.exports = async function(moduleConfig) {
    
    // track renditions?
    if (moduleConfig.trackRenditions)
    {
        addTrackerSupport.call(this, moduleConfig);
    }
    
    // preview support?
    if (moduleConfig.preview)
    {
        addPreviewSupport.call(this, moduleConfig);
    }
};

var addTrackerSupport = function(moduleConfig)
{
    var tracker = trackerFactory(moduleConfig);
    
    // connect to Cloud CMS
    (async function() {
        await tracker.connect();
    })();
    
    // adds in the tracker middle
    this.nuxt.hook("generate:page", function(page) {
        
        //var route = page.route;
        var path = page.path;
        var html = page.html;
        
        tracker.trackPathHtml(path, html);
    });
}

var addPreviewSupport = function(moduleConfig)
{
    // adds in preview support
    this.addPlugin({
        src: path.resolve(__dirname, "./plugins/preview.client.js"),
        options: {
            storage: this.options.generate.dir,
            ...moduleConfig
        }
    });
    
    // adds in dynamic branching
    this.addPlugin({
        src: path.resolve(__dirname, "./plugins/preview.cloudcms.js"),
        options: {
            storage: this.options.generate.dir,
            ...moduleConfig
        }
    });
    
}

module.exports.meta = require("./package.json");
