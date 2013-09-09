
module.exports = {
    list: function(req, res) {
        //var feeds = feedService.getAllFeeds();
        //res.json(feeds);
        res.json("w");
    },

    get: function(req, res) {
        res.json("one");
    },

    create: function(req, res) {
        res.json("new");
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