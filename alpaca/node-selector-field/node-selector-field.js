/**
    A sample field that reads nodes from Cloud CMS and populates an Alpaca Select field (drop down) ahead of being
    rendered.  This is an alternative approach to using Alpaca's DataSource loaders via the Cloud CMS connector.
**/
var SelectField = $.alpaca.Fields.SelectField;

Alpaca.registerFieldClass("node-selector", SelectField.extend({
    
    getFieldType: function() {
        return "node-selector";
    },
    
    setupField: function(callback)
    {
        var self = this;
        
        this.base(function() {

            Gitana.connect(CLOUDCMS_CONFIG, function(err) {

                this.datastore("content").readBranch("master").queryNodes({}).each(function() {
                    self.selectOptions.push({
                        "value": this._doc,
                        "text": this.title
                    });
                }).then(function() {
                    callback();
                });
                
            });
            
        });
    }
    
}));
