module.exports = function () {
    var r = {};

    r.heroFromNode = function (node) {
        var hero = new Hero(node.title, node._doc);
        this.enhanceNode(node);
        hero.multilingual = node.multilingual;
        hero.locale = node.locale;
        return hero;
    };

    r.enhanceNode = function(node) {
        if (!node || !node.__qname) return node;

        // check if this node supports translations
        node.multilingual = false;
        node.features = node.__features();
        if (node.features && node.features["f:multilingual"] && node.features["f:multilingual"].enabled) {
            // it does. another query is needed to retrieve it's translations
            node.multilingual = true;
        }

        node.locale = "default";
        if (node.features && node.features["f:locale"]) {
            // it does. another query is needed to retrieve it's translations
            node.locale = node.features["f:locale"].locale;
        }

        node._qname = node.__qname();
        node._type = node.__type();

        // add in the "_system" block as a top level property
        if (node.getSystemMetadata) {
            node._system = node.getSystemMetadata();
        }
    };

    return r;
}();
