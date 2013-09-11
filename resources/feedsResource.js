var Feed = require("../model/feed");

module.exports = {
    list: function(req, res) {
        Feed.find({}, function(error, result) {
            if (error) {
                return res.json(error);
            }
            res.json(result);
        });
    },

    get: function(req, res) {
        res.json("one");
    },

    create: function(req, res) {
        var feed = new Feed(req.body);
        feed.save(function(error) {
            res.json.log("Failed to save feed: " + error.message);
        });
    },

    update: function(req, res) {
        res.json("updated");
    },

    delete: function(req, res) {
        res.json("deleted");
    },

    random: function(req, res) {
        res.json("randumb");
    },
};