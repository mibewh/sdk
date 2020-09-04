define(function(require, exports, module) {

    var UI = require("ui");
    var moduleId = UI.extractModuleID(module.uri);

    // register the theme: "arrested-development-theme"
    UI.registerTheme({
        "key": "arrested-development-theme",
        "title": "Arrested Development Theme",
        "module": "_modules/" + moduleId + "/theme.js"
    });

});