/**
    A sample field that introduces some custom typeahead logic on top of a TextField.  The typeahead logic uses bloodhound to auto-populate with
    matching Node information.

    This is modeled on top of a "string" type (text field).  As such, the underlying stored value is the Node ID
**/
var TextField = $.alpaca.Fields.TextField;

Alpaca.registerFieldClass("node-search", TextField.extend({
    
    getFieldType: function() {
        return "node-search";
    },
    
    setupField: function(callback)
    {
        var self = this;
        
        this.base(function() {
                        
            var searchNodes = function(q, sync) {

                Gitana.connect(CLOUDCMS_CONFIG, function(err) {

                    var array = [];
                    this.datastore("content").readBranch("master").searchNodes(q).each(function() {
                        array.push({
                            "title": this.title,
                            "value": this._doc
                        })
                    }).then(function() {
                        sync(array);
                    });
                    
                });
            };

            // bind in the typeahead config
            // set up a custom suggestion entry so that we can see both the title and the value
            self.options.typeahead = {
                "config": {
                    "autoselect": true,
                    "highlight": true,
                    "hint": true,
                    "minLength": 1
                },
                "datasets": {
                    "source": searchNodes,
                    "templates": {
                        "suggestion": Handlebars.compile("<div><p style='word-wrap:break-word; white-space: normal'>{{title}} ({{value}})</p></div>")
                    }
                }
            };

            callback();
            
        });
    }
    
}));
