var mongoose = require("mongoose");
var uuid = require("node-uuid");
var Schema = mongoose.Schema;

var Subscriber = new Schema({
    email: {type: String, required: true, match: /^.+@.+\..+/, unique: true, max: 100},
    verified: {type: Boolean, required: true, default: false},
    token: {type: String, required: true, unique: true}
});

Subscriber.post("save", function(doc) {
    console.log("Sending verification email to " + doc.email + " with token " + doc.token);
});

Subscriber.statics.subscribe = function(email, callback) {
    var subscriber = new this({email: email, token: uuid.v4()});
    subscriber.save(callback);
};

Subscriber.statics.verify = function(token, callback) {
    this.update({token: token}, {verified: true}, {multi: true, upsert: true}, callback);
};

Subscriber.statics.unsubscribe = function(token, callback) {
    this.remove({token: token}, callback);
};

module.exports = mongoose.model("Subscriber", Subscriber);