var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Showdown = require("showdown");
var converter = new Showdown.converter();

var Feed = new Schema({
    name: {type: String, required: true, unique: true, max: 50},
    slug: {type: String, required: true, unique: true, max: 50, match: /^[\da-zA-Z-_]*$/},
    url: {type: String, max: 200},
    imageUrl: {type: String, max: 200},
    descriptionMd: {type: String, max: 700},
    endpoint: {type: String, required: true, max: 200},
    pollingRateSec: {type: Number, min: 1, required: true, default: 3600},
    defaultDigest: {type: Boolean, required: true, default: true},
    defaultPublished: {type: Boolean, required: true, default: true}
    //defaultLayoutId: Schema.Types.ObjectId

    //dateModified: {type: Date, required: true},
    //modifiedBy: Schema.Types.ObjectId
});

//allow virtual fields to show up in objects and json responses
Feed.set("toObject", {getters: true});
Feed.set("toJSON", {getters: true});

Feed.virtual("description").get(function() {
    return this.descriptionMd ? converter.makeHtml(this.descriptionMd) : null;
});

module.exports = mongoose.model("Feed", Feed);