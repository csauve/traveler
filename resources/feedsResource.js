var Feed = require("../model/feed");

var copyFields = function(Model, src, dest) {
    for (var field in Model.schema.paths) {
        if ((field !== '_id') && (field !== '__v')) {
            if (src[field] !== undefined) {
                dest[field] = src[field];
            }
        }
    }
};

module.exports = {
    list: function(req, res) {
        Feed.find(function(error, result) {
            if (!error) {
                res.send(result);
            } else {
                console.log(error);
                res.send(400);
            }
        });
    },

    get: function(req, res) {
        Feed.findById(req.params.id, function(error, result) {
            if (error) {
                console.log(error);
                return res.send(400);
            }
            res.send(result ? result : 404);
        });
    },

    create: function(req, res) {
        var feed = new Feed(req.body);
        feed.save(function(error) {
            if (error) {
                console.log(error);
                return res.send(400);
            }
            res.send(feed);
        });
    },

    update: function(req, res) {
        Feed.findById(req.params.id, function(error, result) {
            if (error) {
                console.log(error);
                return res.send(400);
            }
            if (!result) {
                return res.send(404);
            }
            copyFields(Feed, req.body, result);
            result.save();
            res.send(result);
        });
    },

    delete: function(req, res) {
        res.json("deleted");
    },

    random: function(req, res) {
        res.json("randumb");
    },
};