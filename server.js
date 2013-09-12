var config = require("./config");
var express = require("express");
var mongoose = require("mongoose");
var app = express();

app.use(express.bodyParser());
mongoose.connect(config.dbConnectionString);

process.on("uncaughtException", function(error) {
    console.log(error);
});

//API routes
var feedResource = require("./resources/feedResource");
app.get(config.apiPrefix + "/feeds", feedResource.list);
app.get(config.apiPrefix + "/feeds/:id", feedResource.get);
app.post(config.apiPrefix + "/feeds", feedResource.create);
app.put(config.apiPrefix + "/feeds/:id", feedResource.update);
app.del(config.apiPrefix + "/feeds/:id", feedResource.remove);

app.listen(config.port, config.bindAddress);
console.log("API running at http://" + config.bindAddress + ":" + config.port + config.apiPrefix);