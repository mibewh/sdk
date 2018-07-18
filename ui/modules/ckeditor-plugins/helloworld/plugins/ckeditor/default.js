define(function(require, exports, module) {

    require("ckeditor");

    var CKEDITOR = window.CKEDITOR;

    if (!CKEDITOR.config.extraPlugins)
    {
        CKEDITOR.config.extraPlugins = "";
    }

    // so that data- attributes work
    CKEDITOR.config.allowedContent = true;
    CKEDITOR.config.extraAllowedContent = "*[*]{*}(*)";
    CKEDITOR.config.entities = false;
    CKEDITOR.config.basicEntities = false;

    CKEDITOR.config.skin = "bootstrapck,../ckeditor-bootstrap3-theme/bootstrapck/";
    //CKEDITOR.config.plugins = 'dialogui,dialog,about,a11yhelp,dialogadvtab,basicstyles,bidi,blockquote,clipboard,button,panelbutton,panel,floatpanel,colorbutton,colordialog,templates,menu,contextmenu,div,resize,toolbar,elementspath,enterkey,entities,popup,filebrowser,find,fakeobjects,flash,floatingspace,listblock,richcombo,font,forms,format,horizontalrule,htmlwriter,iframe,wysiwygarea,image,indent,smiley,justify,link,indentlist,list,liststyle,magicline,maximize,newpage,pagebreak,pastetext,pastefromword,preview,print,removeformat,save,selectall,showblocks,showborders,sourcearea,specialchar,menubutton,scayt,stylescombo,tab,table,tabletools,undo,wsc';
    CKEDITOR.config.plugins = 'dialogui,dialog,about,a11yhelp,dialogadvtab,basicstyles,bidi,blockquote,clipboard,button,panelbutton,panel,floatpanel,colorbutton,colordialog,templates,menu,contextmenu,div,resize,toolbar,elementspath,enterkey,entities,popup,find,fakeobjects,floatingspace,listblock,richcombo,font,format,horizontalrule,htmlwriter,wysiwygarea,image,indent,justify,link,indentlist,list,liststyle,magicline,maximize,newpage,pagebreak,pastetext,pastefromword,preview,print,removeformat,save,selectall,showblocks,showborders,sourcearea,specialchar,menubutton,scayt,stylescombo,tab,table,tabletools,undo,wsc';

    CKEDITOR.tools.ref_to_url = function (ref) {
        var i = ref.indexOf("://");
        if (i > -1)
        {
            ref = ref.substring(i + 3);
        }

        var parts = ref.split("/");
        //var platformId = parts[0];
        //var repositoryId = parts[1];
        //var branchId = parts[2];
        var nodeId = parts[3];

        return "/res/" + nodeId;
    };

    CKEDITOR.tools.get_plugin_config = function(pluginName, editor) {
        var config = {};

        if (editor.config && editor.config[pluginName])
        {
            config = editor.config[pluginName];
        }

        if (!config) {
            config = {};
        }

        return config;
    };

    return CKEDITOR;
});