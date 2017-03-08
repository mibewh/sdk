$(document).ready(function() {
    $("#form").alpaca({
        "view": "bootstrap-create",
        "schema": {
            "title": "Node ID",                    
            "type": "string"
        },
        "options": {
            "type": "node-selector"
        }
    });
});