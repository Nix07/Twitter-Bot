var Twit = require('twit');
var config = require('./config'); //Contains Credentials

var T = new Twit(config);

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

//Post Request 
var tweet = {
	status: "Tweeted from Twitter API using node.js! @nikhil07prakash "
}

T.post('statuses/update', tweet, tweeted);

function tweeted(err, data, response) {
	if(err) {
		console.log("Something went wrong!");
	} else {
		console.log("It Worked!");
	}
}