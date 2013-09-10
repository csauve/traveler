var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Post = new Schema({
    feedId: Schema.Types.ObjectId,
    title: {type: String, required: true},
    slug: {type: String, required: true, unique: true},//, match: /^/},
    author: {type: String, max: 50},
    digest: {type: Boolean, required: true},
    published: {type: Boolean, required: true},
    layout: {type: Schema.Types.ObjectId, required: true}
});