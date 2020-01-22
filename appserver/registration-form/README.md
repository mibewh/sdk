# Cloud CMS Application Server - Registration Form

This example demonstrates how to use the Cloud CMS dust processor with form support.

## Installation

To set this up, do the following:

1. Create a new Project
2. Create a new Content Type with the QName `custom:registration` using the schema located in the `resources/schema.json` file.
3. Add a `default` form for the `custom:registration` type using the form JSON located in the `resources/form.json` file.
4. Create a List with the key `registrations` of type `custom:registration`.
5. Create a new Application in your project and download the `gitana.json` API keys.  Save this into the root directory of this example.

Then build the application like this:

    npm install
    
And then run the application:

    node app

Open a browser:

    http://localhost:2999

You will see a form rendered.  Fill out and submit it.  The data entry will post to your `registrations` list inside of Cloud CMS.

## How it works

The index.html page uses the @form tag to render a form.  The form renders browser-side using the Alpaca form engine.

    {@form definition="custom:registration" form="default" list="registrations" success="/thankyou.html" error="/index.html"}{/form}
    
This instructs the web page to render a form.  The form is defined in Cloud CMS as:

    - definition `custom:registration`
    - form key `default`
    
When the form is submitted, records are written into the data list with key `registrations`.

Upon success, the user is redirected to `thankyou.html` and back to `index.html` when an error occurs.