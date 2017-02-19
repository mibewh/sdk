# Cloud CMS Sample Web Hook Server

This directory provides a sample Node.js-based web server that can be used to demonstrate web hooks with Cloud CMS.
It provides web hook endpoints for Web Hook actions driven from policy rules as well as workflow.

For example, in a Cloud CMS workflow, you might invoke a web hook like this:

````
"leave": [{
    "type": "webhook",
    "config": {
        "url": "https://ccms-webhook-server.herokuapp.com/taskValidationRandomFail"
    }
}]
````

Where you may have deployed `server.js` to an imaginary endpoint running at `https://ccms-webhook-server.herokuapp.com`.

Similarly, within Cloud CMS, you may configure a Web Hook rule action like this:

````
{
    "url": "https://ccms-webhook-server.herokuapp.com/echo",
    "method": "POST"
}
````

## Building

To build, simple run:

    npm install
    node server

By default, this runs on port 3000.  Use the `PORT` environment variable to adjust.

The API endpoint list can be found here:
  http://localhost:3000/

## Endpoints

The following endpoints are available:

    POST /taskValidationAlwaysSucceed  
    Always returns HTTP 200 and { 'message': 'success' }
    
    POST /taskValidationAlwaysFail  
    Always returns HTTP 400 and { 'message': 'fail' }
    
    POST /taskValidationRandomFail  
    Randomly succeeds roughly 50% of the time it is called. Fails the other 50%
    
    POST /echo 
    Echoes request back with 200

Cloud CMS recommends using POST for all of your web hook endpoints though it also allows for GET, PUT and DELETE.
As such, these examples default to using POST.
