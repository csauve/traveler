var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Showdown = require("showdown");
var converter = new Showdown.converter();

var Post = new Schema({
    //cached feed info
    feedName: {type: String, max: 50},
    feedUrl: {type: String, max: 200},
    feedImageUrl: {type: String, max: 200},

    userSubmitted: {type: Boolean, required: true, default: false},

    title: {type: String, required: true, max: 150, unique: true},
    //slug: {type: String, required: true, unique: true, max: 50, match: /^[\da-zA-Z-_]*$/},
    url: {type: String, required: true, max: 200},
    imageUrl: {type: String, max: 200},
    datePosted: {type: Date, required: true},
    author: {type: String, max: 50},
    submitterName: {type: String, max: 50},
    submitterWebsite: {type: String, max: 200},
    descriptionMd: {type: String, required: true, max: 300},
    tags: {type: [String], lowercase: true, trim: true, max: 30},
    digest: {type: Boolean, required: true, default: false},
    published: {type: Boolean, required: true, default: false}
});

//allow virtual fields to show up in objects and json responses
Post.set("toObject", {getters: true});
Post.set("toJSON", {getters: true});

Post.virtual("description").get(function() {
    return this.descriptionMd ? converter.makeHtml(this.descriptionMd) : null;
});

Post.statics.createCustomPost = function(post, callback) {
    //assert that the post does not belong to a feed
	post.userSubmitted = true;
    delete post.feedName;
    delete post.feedSlug;
    delete post.feedUrl;
    delete post.feedImageUrl;
    //assert that an admin will have to publish this post
    post.published = false;
	var model = new this(post);
	model.save(function(error) {
        callback(error, model);
    });
};

module.exports = mongoose.model("Post", Post);