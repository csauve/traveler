var Feed = require("../model/feed");

module.exports = {
    list: function(req, res) {
        return Feed.find(function(error, result) {
            if (!error) {
                return res.send(result);
            } else {
                console.log(error);
                return res.send(400);
            }
        });
    },

    get: function(req, res) {
        return Feed.findById(req.params.id, function(error, result) {
            if (!error) {
                return res.send(result);
            } else {
                console.log(error);
                return res.send(400);
            }
        });
    },

    create: function(req, res) {
        var feed = new Feed(req.body);
        return feed.save(function(error) {
            if (!error) {
                return res.send(feed);
            } else {
                console.log(error);
                return res.send(400);
            }
        });
    },

    update: function(req, res) {
        return Feed.findById(req.params.id, function(error, result) {
            if (!error) {
                var feed = new Feed(req.body);
                return feed.save(function(error) {
                    if (!error) {
                        return res.send(feed);
                    } else {
                        console.log(error);
                        return res.send(400);
                    }
                });
            } else {
                console.log(error);
                return res.send(400);
            }
        });
    },

    delete: function(req, res) {
        res.json("deleted");
    },

    random: function(req, res) {
        res.json("randumb");
    },
};