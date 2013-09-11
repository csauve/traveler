var config = require("./config");
var express = require("express");
var app = express();

app.use(express.bodyParser());

//connect to database
var mongoose = require("mongoose");
mongoose.connect(config.dbConnectionString);

var getResourceController = function(resourceName) {
    return require("./resources/" + resourceName + "Resource");
};

//RESTful routes
app.get(config.apiPrefix + "/:resource", function(req, res) {
    getResourceController(req.params.resource).list(req, res);
});

app.get(config.apiPrefix + "/:resource/:id", function(req, res) {
    getResourceController(req.params.resource).get(req, res);
});

app.post(config.apiPrefix + "/:resource", function(req, res) {
    getResourceController(req.params.resource).create(req, res);
});

app.put(config.apiPrefix + "/:resource/:id", function(req, res) {
    getResourceController(req.params.resource).update(req, res);
});

app.delete(config.apiPrefix + "/:resource/:id", function(req, res) {
    getResourceController(req.params.resource).delete(req, res);
});

//generic route
app.all(config.apiPrefix + "/:resource/:action/:id?", function(req, res) {
    getResourceController(req.params.resource)[req.params.action](req, res);
});

app.listen(config.port, config.bindAddress);
console.log("Listening on http://" + config.bindAddress + ":" + config.port + config.apiPrefix);