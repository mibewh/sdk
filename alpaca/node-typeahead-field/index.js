$(document).ready(function() {
    $("#form").alpaca({
        "view": "bootstrap-create",
        "schema": {
            "title": "Node ID",                    
            "type": "string"
        },
        "options": {
            "type": "node-selector-typeahead"
        },
        "postRender": function(control) {

            // when the control's value changes, print out the node ID
            control.on("change", function() {
                console.log(this.getValue());
            });
        }
    });
});