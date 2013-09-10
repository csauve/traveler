var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Subscriber = new Schema({
    email: {type: String, required: true, match: /^.+@.+\..+/},
    verified: {type: Boolean, required: true, default: false}
});

exports = mongoose.model("Subscriber", Subscriber);