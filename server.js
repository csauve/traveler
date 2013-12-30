var config = require("./config");
var express = require("express");
var mongoose = require("mongoose");
var path = require("path");
var log = require("winston");

process.on("uncaughtException", function(error) {
    log.error("Uncaught exception: " + error.stack);
    throw error;
});

//configure the express server
log.info("Configuring express");
var app = express();
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.compress());
app.use(config.staticPrefix, express.static(path.join(config.webAppPath, "static"),
    {maxAge: 86400000}));
app.use(app.router);
if (config.trustProxy) {
    //for use behind a reverse proxy
    app.enable("trust proxy");
}
app.use(function(error, req, res, next) {
    log.error("Error handling request: " + req);
    log.error(error.stack);
    res.send(500);
});

//set up routes serving the API
log.info("Setting up routes");
var feedResource = require("./resources/feedResource");
app.get(config.apiPrefix + "/feeds", feedResource.list);
app.get(config.apiPrefix + "/feeds/:id", feedResource.get);
app.post(config.apiPrefix + "/feeds", feedResource.create);
app.put(config.apiPrefix + "/feeds/:id", feedResource.update);
app.del(config.apiPrefix + "/feeds/:id", feedResource.remove);

var subscriberResource = require("./resources/subscriberResource");
app.all(config.apiPrefix + "/subscribers/verify", subscriberResource.verify);
app.all(config.apiPrefix + "/subscribers/unsubscribe", subscriberResource.unsubscribe);
app.get(config.apiPrefix + "/subscribers", subscriberResource.list);
app.get(config.apiPrefix + "/subscribers/:id", subscriberResource.get);
app.post(config.apiPrefix + "/subscribers", subscriberResource.create);
app.del(config.apiPrefix + "/subscribers/:id", subscriberResource.remove);

var postResource = require("./resources/postResource");
app.get(config.apiPrefix + "/posts", postResource.list);
app.post(config.apiPrefix + "/posts/check/title/:query", postResource.checkTitle);
app.get(config.apiPrefix + "/posts/:id", postResource.get);
app.post(config.apiPrefix + "/posts", postResource.create);
app.put(config.apiPrefix + "/posts/:id", postResource.update);
app.del(config.apiPrefix + "/posts/:id", postResource.remove);

var linkResource = require("./resources/linkResource");
app.get(config.apiPrefix + "/links", linkResource.list);
app.get(config.apiPrefix + "/links/:id", linkResource.get);
app.post(config.apiPrefix + "/links", linkResource.create);
app.put(config.apiPrefix + "/links/:id", linkResource.update);
app.del(config.apiPrefix + "/links/:id", linkResource.remove);

//handle invalid API routes
app.get(config.apiPrefix + "/*", function(req, res) {
    res.send(404);
});

//all other routes serve the angular app
app.all("*", function(req, res) {
    res.sendfile(path.join(config.webAppPath, "/index.html"));
});

//connect to database and start listening for requests
mongoose.connect(config.dbConnectionString, function(error) {
    if (error) {
        log.error("Failed to connect to database at " + config.dbConnectionString);
        throw error;
    } else {
        log.info("Connected to database at " + config.dbConnectionString);

        //start listening for requests
        app.listen(config.port);
        log.info("Server running on port " + config.port);
    }
});

mongoose.connection.on("error", function(error) {
    log.error("Database connection error: " + error);
});
