module.exports = function(app, dust, cb) {

    var support = require('cloudcms-server/duster/support')(dust);
    var end = support.end;

    dust.helpers.testTag = function (chunk, context, bodies, params) {
        return support.map(chunk, function (chunk) {
            var req = context.get("req");
            var newContext = context.push({
                "useragent": req.useragent,
                "user_agent": req.headers['user-agent'],
                "accept_language": req.headers['accept-language']
            });

            chunk.render(bodies.block, newContext);
            end(chunk, context);
        });
    };

    return cb();
};
