define(function(require, exports, module) {

    var CKEDITOR = require("./default.js");
    window.CKEDITOR = CKEDITOR;

    var Ratchet = require("ratchet/web");

    return {
        registerPlugin: function(pluginId)
        {
            var pluginPath = "../../../_modules/helloworld/plugins/ckeditor/helloworld/";

            CKEDITOR.plugins.addExternal(pluginId, pluginPath, 'plugin.js');

            if (CKEDITOR.config.extraPlugins.length > 0) {
                CKEDITOR.config.extraPlugins += ",";
            }
            CKEDITOR.config.extraPlugins += pluginId;
        }
    };
});
