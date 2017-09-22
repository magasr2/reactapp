var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({


title:{
	type: String,
	required: true
},

link: {
	type: String,
	required: true
},

note: {
	type: Schema.Types.ObjectId,
	ref: "Note"
}
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;

//How do I know what the blueprint for the hw should be
//How many blueprint hw's do I need