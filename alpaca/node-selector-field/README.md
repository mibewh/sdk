# Node Selector Field

This directory provides an example of a custom Node Selector field that connects to Cloud CMS to render a drop down whose values are
populated from a Cloud CMS query.  It exists to demonstrate how you can load values from a remote query to Cloud CMS and then
use those values within a custom Cloud CMS field.

These are implemented in a fashion that gives you more direct control, possibly, than using Alpaca data sources or an
Alpaca loader.  They serve as a reference for what is possible (but not necessarily recommended).  This is really up to you.

## How to run this

Be sure to update `cloudcms-config.js` with API keys from your tenant.

These files must be served from a web server.

If you're on a Mac, you can start a simple web server like this:

    python -m SimpleHTTPServer

And then go to http://localhost:8000/index.html


