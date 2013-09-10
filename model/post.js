var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Post = new Schema({
    feedId: Schema.Types.ObjectId,
    title: {type: String, required: true, max: 150},
    slug: {type: String, required: true, unique: true, max: 50, match: /^[\da-zA-Z-_]*$/},
    url: {type: String, required: true, max: 200},
    datePosted: {type: Date, required: true},
    author: {type: String, max: 50},
    descriptionMd: {type: String, required: true, max: 300},
    tags: {type: [String], lowercase: true, trim: true, max: 30}
    digest: {type: Boolean, required: true},
    published: {type: Boolean, required: true}
    //layout: {type: Schema.Types.ObjectId, required: true}
});

exports = mongoose.model("Post", Post);