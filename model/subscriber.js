var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Subscriber = new Schema({
    email: {type: String, required: true, match: /^\w+@\w+.\w+/}
});

exports = mongoose.model("Subscriber", Subscriber);