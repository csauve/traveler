var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Feed = new Schema({
    title: {type: String, required: true, unique: true, max: 100},
    slug: {type: String, required: true, unique: true}//, match: /^/}
    description: {type: String, max: 500},
    url: {type: String, max: 200},
    endpointUrl: {type: String, required: true, max: 200},
    pollingRateSec: {type: Number, min: 1, required: true, default: 3600},
    lastUpdated: {type: Date, required: true},

    defaultDigest: {type: Boolean, required: true, default: true},
    defaultPublished: {type: Boolean, required: true, default: true},
    defaultLayoutId: Schema.Types.ObjectId

    //dateModified: {type: Date, required: true},
    //modifiedBy: Schema.Types.ObjectId
});

exports = mongoose.model("Feed", Feed);