/**
    A sample field that introduces some custom typeahead logic on top of a TextField.  The typeahead logic uses bloodhound to auto-populate with
    matching Node information.

    This is modeled on top of a "string" type (text field).  As such, the underlying stored value is the Node ID
**/
var TextField = $.alpaca.Fields.TextField;

Alpaca.registerFieldClass("node-selector-typeahead", TextField.extend({
    
    getFieldType: function() {
        return "node-selector-typeahead";
    },
    
    setupField: function(callback)
    {
        var self = this;
        
        this.base(function() {
                        
            Gitana.connect(CLOUDCMS_CONFIG, function(err) {

                var array = [];
                
                this.datastore("content").readBranch("master").queryNodes({}).each(function() {
                    array.push({
                        "title": this.title,
                        "value": this._doc
                    })
                }).then(function() {

                    // set up typeahead using bloodhoud
                    // the "datumTokenizer" converts an array element (title, value) into an array of token matches [value, title]
                    // the "queryTokenizer" converts a query like "some thing" into an array of tokens to query with ["some", "thing"]  
                    var data = new Bloodhound({
                        "datumTokenizer": function(a) {
                            var tokens = [a.value];
                            
                            if (a.title) {
                                var titleTokens = Bloodhound.tokenizers.whitespace(a.title);
                                for (var i = 0; i < titleTokens.length; i++) {
                                    tokens.push(titleTokens[i]);
                                }
                            }
                            
                            return tokens;
                        },
                        "queryTokenizer": Bloodhound.tokenizers.whitespace,
                        "local": array
                    });
                    data.initialize();
                                  
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
                            "source": data.ttAdapter(),
                            "templates": {
                                "suggestion": Handlebars.compile("<div><p style='word-wrap:break-word; white-space: normal'>{{title}} ({{value}})</p></div>")
                            }
                        }
                    };
                    
                    callback();
                });
                
            });
            
        });
    }
    
}));
