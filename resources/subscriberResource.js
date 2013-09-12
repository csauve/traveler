var genericResource = require("./genericResource");
var Subscriber = require("../model/subscriber");

module.exports = {
    //todo: only allow admins to view a list of subscribers
    list: function(req, res) {
        genericResource.list(Subscriber, req, res);
    },

    //todo: only allow admins to view a subscriber
    get: function(req, res) {
        genericResource.get(Subscriber, req, res);
    },

    //anyone can subscribe
    create: function(req, res) {
        if (!req.body || !req.body.email) {
            res.send(400);
        }
        Subscriber.subscribe(req.body.email, function(error) {
            if (error) {
                return res.send(400);
            }
            res.send(200);
        });
    },

    //todo: admin auth
    remove: function(req, res) {
        genericResource.remove(Subscriber, req, res);
    },

    verify: function(req, res) {
        if (!req.query.token) {
            return res.send(400);
        }
        Subscriber.verify(req.query.token, function(error) {
            if (error) {
                return res.send(400);
            }
            res.send(200);
        });
    },

    unsubscribe: function(req, res) {
        if (!req.query.token) {
            return res.send(400);
        }
        Subscriber.unsubscribe(req.query.token, function(error) {
            if (error) {
                return res.send(400);
            }
            res.send(200);
        });
    }
};