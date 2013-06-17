var MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server,
    db;

var mongoClient = new MongoClient(new Server('localhost', 27017));

mongoClient.open(function(err, mongoClient) {
    db = mongoClient.db("matchRatingsdb");
    db.collection('matchRatings', {strict:true}, function(err, collection) {
        if (err) {
            console.log("The 'matchRatings' collection doesn't exist. Creating it with sample data...");
            populateDB();
        }
    });
});

exports.newRating = function (req, res) {
    var rating = req.body;
    var matchId = parseInt(req.params.matchId);
    
    console.log('New match rating');
    console.log(JSON.stringify(rating));
    
    db.collection('matchRatings', function(err, collection) {
        collection.insert(rating, {safe:true}, function(err, item) {
              res.send(201, {"success" : true});
        });
    });
};

exports.findAllForOneMatch = function (req, res) {
    console.log("All ratings for match: " + req.params.matchId);

    matchId = parseInt(req.params.matchId)
    db.collection('matchRatings', function(err, collection) {
        collection.find({'matchId' : matchId}).toArray(function(err, items) {
            res.jsonp(items);
        });
    });
};

exports.findAll = function(req, res) {
    console.log("Find all match ratings");
    db.collection('matchRatings', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.jsonp(items);
        });
    });
};


var populateDB = function() {
 
    console.log("Populating matchRatings database...");
    var matchRatings = [
        {"matchId" : 1, "match" :"Barcelona - Real Madrid", "score" : "2-1", "comment" : "Barca vant i en thriller av en match"},
        {"matchId" : 1, "scala": "1-10", "players" : [
            {"name" : "Pique", "rating" : 5, "comment" : "Klumsete og keitete, stadig i siste liten"}, 
            {"name" : "Puyol", "rating" : 9, "comment" : "Sjef, kaptein, rydder opp etter sin makker."}, 
            {"name" : "Alves", "rating" : 7, "comment" : "Innlegg bak mål"}
        ]},
        {"matchId" : 1, "scala": "1-10", "players" : [
            {"name" : "Pique", "rating" : 2, "comment" : "I siste liten"}, 
            {"name" : "Puyol", "rating" : 1, "comment" : "Sjef, kaptein, rydder opp etter sin makker."}, 
            {"name" : "Alves", "rating" : 9, "comment" : "Innlegg bak mål"}
        ]}
    ];
 
    db.collection('matchRatings', function(err, collection) {
        collection.insert(matchRatings, {safe:true}, function(err, result) {});
    });
};