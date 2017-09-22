var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

var Article = require('./models/article.js');

var request = require("request");
var cheerio = require("cheerio");

mongoose.Promise = Promise;

var app = express();

app.use(logger("dev"));
app.use(bodyParser.urlencoded({
	extended: false
}));

app.use(express.static("public"));

mongoose.connect("mongodb://localhost/week18day3mongoose");
var db = mongoose.connection;

db.on("error", function(error) {
	console.log("Mongoose Error: ", error);
});

db.once("open", function(){
	console.log("Mongoose connection successful.");
});

app.get("/scrape", function(req,res) {
	request("http://www.bbc.com/news/world/europe", function(error, response, html){

	var $ = cheerio.load(html);

	$("h3 span.title-link__title-text").each(function(i, element) {

		var result = {};

		result.title = $(this).children("a").text();
		result.link = $(this).children("a").attr("href");

		var entry = new Article(result);

		entry.save(function(err, doc){
			if(err) {
				console.log(err);
			}
			else {
				console.log(doc);
			}
		});
	});
	});
	res.send("Scrape has been completed");
});


app.get("/articles", function(req,res) {
	Article.find({}, function(error, doc) {
		if(error) {
			console.log(error);
		}
		else {
			res.json(doc);
		}
	});
});


app.listen(3000,function(){
	console.log("App is running on port 3000!");
});