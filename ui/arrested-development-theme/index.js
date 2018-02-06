define(function(require) {

    var UI = require("ui");
    var moduleId = module.uri.match(/^.+(_modules[^\/]+)\/.*/)[1];

    // register the theme: "arrested-development-theme"
    UI.registerTheme({
        "key": "arrested-development-theme",
        "title": "Arrested Development Theme",
        "module": moduleId + "/theme.js"
    });

});