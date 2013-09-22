var genericResource = require("./genericResource");
var Post = require("../model/post");

module.exports = {
    //todo: filtering, ordering, and pagination
    list: function(req, res) {
        genericResource.list(Post, req, res);
    },

    get: function(req, res) {
        genericResource.get(Post, req, res);
    },

    create: function(req, res) {
        if (!req.body) {
            return res.send(400);
        }
        Post.createCustomPost(req.body, function(error, result) {
            if (error) {
                return res.send(400);
            }
            res.send(result);
        });
    },

    update: function(req, res) {
        genericResource.update(Post, req, res);
    },

    remove: function(req, res) {
        genericResource.remove(Post, req, res);
    },

    //used for uniqueness check while
    checkTitle: function(req, res) {
        Post.find({title: req.params.query}, function(error, result) {
            if (!error) {
                res.send(result);
            } else {
                console.log(error);
                res.send(400);
            }
        });
    }
};