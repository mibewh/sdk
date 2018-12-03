var util = require("../lib/util.js");
var cloudcmsUtil = require("cloudcms-server/util/util");

module.exports = function (app, callback) {

    app.get("/api/heroes", function (req, res) {
        req.cache.read("heroes", function (err, cachedNodes) {
            if (cachedNodes) {
                console.log("found heroes in cache: " + cachedNodes.length);
                return res.status(200).json(cachedNodes);
            }

            var nodes = [];
            req.branch(function (err, branch) {
                branch.trap(function (err) {
                        return res.status(500).json(err);
                    }).queryNodes({
                        _type: "demo:hero",
                        "_features.f:translation": { // skip translations
                            "$exists": false
                        }
                    }, {
                        "limit": 100
                    })
                    .each(function () {
                        var node = this;
                        nodes.push(heroFromNode(node));
                    }).then(function () {
                        req.cache.write("heroes", nodes, 60 * 2 /* cache for 2 minutes */ , function () {
                            return res.status(200).json(nodes);
                        });
                    });
            });
        });
    });

    app.get('/api/heroes/:_doc', function (req, res) {
        req.cache.read(req.params._doc, function (err, cachedNode) {
            if (cachedNode) {
                console.log("found hero in cache: " + JSON.stringify(cachedNode));
                return res.status(200).json(cachedNode);
            }

            req.branch(function (err, branch) {
                branch.trap(function (err) {
                    return res.status(500).json(err);
                }).readNode(req.params._doc).then(function () {
                    var node = heroFromNode(this);
                    if (node.multilingual) {
                        this.listTranslations().then(function () {
                            var result = this.asArray();
                            for (var i = 0; i < result.length; i++) {
                                hero.translations.push(JSON.parse(JSON.stringify(heroFromNode(result[i]))));
                            }

                            req.cache.write(req.params._doc, node, 60 * 2 /* cache for 2 minutes */ , function () {
                                return res.status(200).json(node);
                            });
                        });
                    } else {
                        req.cache.write(req.params._doc, node, 60 * 2 /* cache for 2 minutes */ , function () {
                            return res.status(200).json(node);
                        });
                    }
                });
            });
        });
    });

    app.put('/api/heroes', function (req, res) {
        req.branch(function (err, branch) {
            branch.trap(function (err) {
                return res.status(500).json(err);
            }).readNode(req.body._doc).then(function () {
                var node = this;
                node.title = req.body.name;
                node.update().then(function () {
                    var node = heroFromNode(this);
                    if (node.multilingual) {
                        this.listTranslations().then(function () {
                            var result = this.asArray();
                            for (var i = 0; i < result.length; i++) {
                                hero.translations.push(JSON.parse(JSON.stringify(heroFromNode(result[i]))));
                            }

                            req.cache.write(node._doc, node, 60 * 2 /* cache for 2 minutes */ , function () {
                                req.cache.remove('heroes', function () {
                                    return res.status(200).json(node);
                                });
                            });
                        });
                    }

                    req.cache.write(node._doc, node, 60 * 2 /* cache for 2 minutes */ , function () {
                        req.cache.remove('heroes', function () {
                            return res.status(200).json(node);
                        });
                    });
                });
            });
        });
    });

    app.post('/api/heroes', function (req, res) {
        req.branch(function (err, branch) {
            branch.trap(function (err) {
                return res.status(500).json(err);
            }).createNode({
                _type: "demo:hero",
                title: req.body.name
            }).then(function () {
                var node = heroFromNode(this);
                if (node.multilingual) {
                    this.listTranslations().then(function () {
                        var result = this.asArray();
                        for (var i = 0; i < result.length; i++) {
                            hero.translations.push(JSON.parse(JSON.stringify(heroFromNode(result[i]))));
                        }

                        req.cache.write(node._doc, node, 60 * 2 /* cache for 2 minutes */ , function () {
                            req.cache.remove('heroes', function () {
                                return res.status(200).json(node);
                            });
                        });
                    });
                } else {
                    req.cache.write(node._doc, node, 60 * 2 /* cache for 2 minutes */ , function () {
                        req.cache.write(node._doc, node, 60 * 2 /* cache for 2 minutes */ , function () {
                            req.cache.remove('heroes', function () {
                                return res.status(200).json(node);
                            });
                        });
                    });
                }
            });
        });
    });

    app.get('/api/heroes/', function (req, res) {
        req.branch(function (err, branch) {
            branch.trap(function (err) {
                return res.status(500).json(err);
            }).queryNodes({
                _type: "demo:hero",
                title: req.query.name
            }).then(function() {
                var results = [];
                var result = this.asArray();
                for (var i = 0; i < result.length; i++) {
                    var node = heroFromNode(result[i]);
                    results.push(node);
                }
                return res.status(200).json(results);
            });
        });
    });

    app.get('/heroes', function (req, res) {
        res.redirect('/');
    });

    app.get('/dashboard', function (req, res) {
        res.redirect('/');
    });

    callback();
};

function heroFromNode(node) {
    node.name = node.title;
    node.id = node._doc;
    cloudcmsUtil.enhanceNode(node);
    node.multilingual = node.multilingual;
    node.locale = node.locale;
    return node;
}
