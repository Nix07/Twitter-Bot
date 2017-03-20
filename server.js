console.log("It started working!");

var Twit = require('twit');
var config = require('./config'); //Contains Credentials

var T = new Twit(config);

var stream = T.stream('user'); //Using User Stream
stream.on('follow', followed);

function followed(event) {
	var name = event.source.name;
	var screenName = event.source.screen_name;
	tweetIt('Thanks for following me! ' + '@' + screenName);
}

//Post Request 
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