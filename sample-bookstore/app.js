var server = require("cloudcms-server/server");
var path = require("path"); 

var routes = function (app, callback)
{
    app.get("/api/books", function(req, res) {
        req.branch(function(err, branch) {
            branch.trap(function(err) {
                return res.status(500).json(err);
            }).queryNodes({
                _type: "store:book"
            }).each(function() {
                this.imageUrl = "/static/" + this._doc + "-cover.jpg?repository=" + this.getRepositoryId() + "&branch=" + this.getBranchId() + "&node=" + this.getId();
                this.authorTitle = this.author.title;
            }).then(function() {
                res.status(200).json(this);
            });
        });
    });

    app.get("/api/authors", function(req, res) {
        req.branch(function(err, branch) {
            branch.trap(function(err) {
                return res.status(500).json(err);
            }).queryNodes({
                _type: "store:author"
            }).each(function() {
                this.imageUrl = '/proxy/repositories/' + this.getRepositoryId() + '/branches/' + this.getBranchId() + '/nodes/' + this._doc + '/attachments/default';
            }).then(function() {
                res.status(200).json(this);
            });
        });
    });

    callback();
};

server.routes(routes);

server.start({
    "setup": "single",
    "welcome": {
        "enabled": true,
        "file": "index.html"
    },
    "wcm": {
        "enabled": true,
        "cache": false
    },
    "cache": {
        "enabled": true
    },
    "autoRefresh": {
        "log": true
    },
    "perf": {
        "enabled": true,
        "paths": [{
            "regex": "/static/.*",
            "cache": {
                "seconds": 300
            }
        }]
    }
});







