# Node Search Field

This directory provides an example of a custom Node typeahead field that connects to Cloud CMS to retrieve potential typeahead values, list suggestions and make selection easier.  It uses Twitter's Typeahead and Bloodhound plugins in conjunction with Alpaca's support for these modules in rendering
typeahead suggestions.

This example performs a search using whatever text you type in.

It exists to demonstrate how you can load values from a remote search to Cloud CMS and then use those values within a custom Cloud CMS field.

## How to run this

Be sure to update `cloudcms-config.js` with API keys from your tenant.

These files must be served from a web server.

If you're on a Mac, you can start a simple web server like this:

    python -m SimpleHTTPServer

And then go to http://localhost:8000/index.html


