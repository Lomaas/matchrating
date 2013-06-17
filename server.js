var express = require('express'),
    matches = require('./routes/matchRatings');
 
var app = express();

app.configure(function(){
  app.use(express.bodyParser());
});

app.get('/matchratings', matches.findAll);	// Get list of all matches that have been rated
app.get('/matchratings/:matchId', matches.findAllForOneMatch);	// Get all ratings for one match

app.post('/matchratings/:matchId', matches.newRating);	// Post ratings for one match

app.listen(3000);
console.log('Listening on port 3000...');