var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var moment     = require("moment");

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var describeRequest = function(req)
{
    var obj = {};
    obj.method = req.method;
    obj.path = req.path;
    if (req.query) {
        obj.query = req.query;
    }
    if (req.headers) {
        obj.headers = req.headers;
    }
    if (req.body) {
        obj.body = req.body;
    }

    obj.timestamp = moment().format("MM-DD-YYYY HH:mm:ss.ms");

    return obj;
};

// logs request to stdout for development use
var logRequest = function(req)
{
    var obj = describeRequest(req);

    console.log(obj.timestamp + " " + obj.method + " " + obj.path + ": " + JSON.stringify(obj, null, 2));
};

// log all requests
app.use(function(req, res, next) {
    logRequest(req);
    next();
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// ROUTES
//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

var router = express.Router();
app.use('/', router);

router.get('/', function(req, res)
{
    res.status(200).json({
        message: 'success',
        endpoints: [
            "GET/POST: /taskValidationAlwaysSucceed  Always returns HTTP 200 and { 'message': 'success' }",
            "GET/POST: /taskValidationAlwaysFail  Always returns HTTP 400 and { 'message': 'fail' }",
            "GET/POST: /taskValidationRandomFail  Randomly succeeds roughly 50% of the time it is called. Fails the other 50%",
            "GET/POST: /echo  Echoes request back with 200"
        ]
    });
});

router.post('/taskValidation', function(req, res)
{
    // do something useful here. until then always succeed
    res.status(200).json({ message: 'success' });
});

router.post('/taskValidationRandomFail', function(req, res)
{
    // randomly fail 50% of the time
    var n = Math.floor(Math.random()*100) < 50;
    if(Math.floor(Math.random()*10) > 5) {
        res.status(400).json({ message: 'fail' });
    } else {
        res.status(200).json({ message: 'success'});
    }
});

router.post('/taskValidationAlwaysSucceed', function(req, res)
{
    res.status(200).json({ message: 'success' });
});

router.post('/taskValidationAlwaysFail', function(req, res)
{
    res.status(400).json({ message: 'fail' });
});

router.post("/echo", function(req, res)
{
    res.status(200).json(describeRequest(req));
});


///////


app.listen(port);
console.log("Cloud CMS Example Web Hook Server Running");
console.log("Running on port: " + port);
