var genericResource = require("./genericResource");
var Feed = require("../model/feed");

module.exports = {
    list: function(req, res) {
        genericResource.list(Feed, req, res);
    },

    get: function(req, res) {
        genericResource.get(Feed, req, res);
    },

    create: function(req, res) {
        genericResource.create(Feed, req, res);
    },

    update: function(req, res) {
        genericResource.update(Feed, req, res);
    },

    remove: function(req, res) {
        genericResource.remove(Feed, req, res);
    }
};