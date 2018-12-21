var util = require("./util.js");
var cloudcmsUtil = require("cloudcms-server/util/util");

module.exports = function (app, callback) {
    var appInit = false;

    app.all("/graphql", function (req, res) {
        console.log("url: " + req.url);
        // console.log("query: " + req.params.query);

        req.branch(function (err, branch) {
            branch.trap(function (err) {
                console.log("Error: " + req.url + " " + err);
                return res.status(500).json(err);
            }).then(function (err) {
                var branch = this;

                branch.graphqlQuery(req.body.query, req.body.operationName, req.body.variables, function (response) {
                    return res.status(200).json(response);
                });
            });
        });
    });

    app.use(function (req, res, next) {
        // install defintion if missing
        if (appInit) {
            return next();
        }

        appInit = true;

        var definition = require("../course-definition.json");

        req.branch(function (err, branch) {
            branch.queryNodes({
                _type: definition._type,
                _qname: definition._qname
            }).then(function () {
                if (this.asArray().length === 0) {
                    // add the definition to the branch
                    branch.createNode(definition).then(function () {
                        // create a sample node on the branch
                        branch.createNode({
                            _type: "demo:course",
                            title: "test course 1",
                            author: "test author",
                            description: "test description",
                            topic: "test topic",
                            url: ""
                        }).then(function () {
                            next();
                            return;
                        });
                    });
                } else {
                    next();
                    return;
                }
            });
        });
    });

    callback();
};
