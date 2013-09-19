var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Link = new Schema({
    name: {type: String, required: true, unique: true, max: 50},
    category: {type: String, required: true, max: 50},
    url: {type: String, required: true, max: 200},
    imageUrl: {type: String, max: 200},
    descriptionMd: {type: String, required: true, max: 700}
});

module.exports = mongoose.model("Link", Link);