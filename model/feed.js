var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Feed = new Schema({
    id: Schema.Types.ObjectId,
    name: {type: String, required: true, unique: true, max: 50},
    slug: {type: String, required: true, unique: true, max: 50, match: /^[\da-zA-Z-_]*$/},
    url: {type: String, required: true, max: 200},
    imageUrl: {type: String, max: 200},
    descriptionMd: {type: String, required: true, max: 700},
    endpoint: {type: String, required: true, max: 200},
    pollingRateSec: {type: Number, min: 1, required: true, default: 3600},
    defaultDigest: {type: Boolean, required: true, default: true},
    defaultPublished: {type: Boolean, required: true, default: true}
    //defaultLayoutId: Schema.Types.ObjectId

    //dateModified: {type: Date, required: true},
    //modifiedBy: Schema.Types.ObjectId
});

module.exports = mongoose.model("Feed", Feed);