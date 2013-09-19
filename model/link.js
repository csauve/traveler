var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Showdown = require("showdown");
var converter = new Showdown.converter();

var Link = new Schema({
    name: {type: String, required: true, unique: true, max: 50},
    category: {type: String, required: true, max: 50},
    url: {type: String, required: true, max: 200},
    imageUrl: {type: String, max: 200},
    descriptionMd: {type: String, required: true, max: 700}
});

//allow virtual fields to show up in objects and json responses
Link.set("toObject", {getters: true});
Link.set("toJSON", {getters: true});

Link.virtual("description").get(function() {
	return converter.makeHtml(this.descriptionMd);
});

module.exports = mongoose.model("Link", Link);