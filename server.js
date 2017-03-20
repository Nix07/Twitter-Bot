console.log("It started working!");

var Twit = require('twit');
var config = require('./config'); //Contains Credentials

var T = new Twit(config);

var stream = T.stream('user'); //Using User Stream
//Anytime Someone Follows me
stream.on('follow', followed);
//Anytime Someone Tweets me
stream.on('tweet', tweetEvent);

function followed(event) {
	var name = event.source.name;
	var screenName = event.source.screen_name;
	tweetIt('Thanks for following me! ' + '@' + screenName);
}

function tweetIt(txt) {
	var tweet = {
		status: txt
	}

	T.post('statuses/update', tweet, tweeted);

	function tweeted(err, data, response) {
		if(err) {
			console.log("Something went wrong!");
		} else {
			console.log("It Worked!");
		}
	}
}

function tweetEvent(event) {
	var fs = require('fs');
	var json = JSON.stringify(event,null,2);
	fs.writeFile("tweet.json", json);

	var replyto = event.in_reply_to_screen_name;
	var text = event.text;
	var from = event.user.screen_name;

	if(replyto === 'nikhil07parkash') {
		var newtweet = 'Thank you for tweeting me! ' + '@' + from;
		tweetIt(newtweet);
	}
}

/* Get Resquest from the Twitter
var params = {
	q: 'HelloCloudSweepstakes',
	count: 5
}

T.get('search/tweets', params, gotData);

function gotData(err, data, response) {
	var tweets = data.statuses;
	for( var i = 0; i < tweets.length; i++)
		console.log(tweets[i].text);
}
*/