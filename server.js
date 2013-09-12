var config = require("./config");
var express = require("express");
var mongoose = require("mongoose");
var path = require("path");
var app = express();

process.on("uncaughtException", function(error) {
    console.log(error);
});

mongoose.connect(config.dbConnectionString);

app.use(config.staticPrefix, express.static(path.join(config.webAppPath, "static")));
app.use(app.router);
app.use(express.bodyParser());

//API routes
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
app.get(config.apiPrefix + "/posts/:id", postResource.get);
app.post(config.apiPrefix + "/posts", postResource.create);
app.put(config.apiPrefix + "/posts/:id", postResource.update);
app.del(config.apiPrefix + "/posts/:id", postResource.remove);

//all other routes serve the ember app
app.all("*", function(req, res) {
    res.sendfile(path.join(config.webAppPath, "/index.html"));
});

app.listen(config.port, config.bindAddress);
console.log("API running at http://" + config.bindAddress + ":" + config.port + config.apiPrefix);
