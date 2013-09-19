var genericResource = require("./genericResource");
var Link = require("../model/link");

module.exports = {
    //todo: filtering, ordering, and pagination
    list: function(req, res) {
        Link.find().sort("category name").exec(function(error, result) {
            if (!error) {
                //group links into categories
                var categorized = {};
                for (var i = 0; i < result.length; i++) {
                    var category = result[i].category;
                    if (!categorized[category]) {
                        categorized[category] = [];
                    }
                    categorized[category].push(result[i]);
                };
                res.send(categorized);
            } else {
                console.log(error);
                res.send(500);
            }
        });
    },

    create: function(req, res) {
        genericResource.create(Link, req, res);
    },

    update: function(req, res) {
        genericResource.update(Link, req, res);
    },

    remove: function(req, res) {
        genericResource.remove(Link, req, res);
    }
};