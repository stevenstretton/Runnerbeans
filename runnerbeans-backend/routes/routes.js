var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var assert = require('assert');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var gpxParse = require("gpx-parse");

var url = 'mongodb://localhost:27017/runnerbean';
var MongoClient = mongo.MongoClient;
var currentAccountEmail = '';

var multer = require('multer');
var fs = require('fs');
var DIR = './uploads';
var upload = multer({dest: DIR});


//http://expressjs.com/en/guide/using-middleware.html


/* GET home page. */
router.get('/', function(req, res, next) {

});

router.get('/register', function(req, res, next){
    res.send({name: "register!"});
    console.log("register");
});

router.post('/register', function(req, res, next){

    //https://www.npmjs.com/package/bcrypt
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt); //encrypts the password from salt
    var newAccount = req.body;

    console.log(hash);
    newAccount.password = hash;

    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        db.collection('user-accounts').insertOne(newAccount, function (err, result) {
            assert.equal(null, err);
            console.log('User added to Mongo');
            db.close();
            res.json(newAccount);
        });
        db.close();
    });

});

router.get('/login', function(req, res, next) {
    console.log("register");
});

router.post('/login', function(req, res, next) {

    var loginEmail = req.body.email;
    var loginPassword = req.body.password;

    MongoClient.connect(url, function (err, db) {

        var col = db.collection('user-accounts');
        col.findOne({
            'email': loginEmail
        }, function (err, doc) {

            //checks if the password entered on the form matches to the account that is found
            bcrypt.compare(loginPassword, doc.password, function (err, valid) {
                //checks if the found passwords are correct
                if (valid == true) {

                    //creates the web token -- https://github.com/auth0/node-jsonwebtoken
                    var token = jwt.sign(doc, 'cycling');

                    //removes the password off the JSON
                    delete doc.password;
                    doc.token = token;

                    //Sends the loaded account (without password) and token to the front end
                    res.json({
                        "user": doc
                    });
                } else if (valid == false) {
                    console.log('incorrect password :(');
                }
            });

        });
        console.log('User found from Mongo :D');
        db.close();
    });

    currentAccountEmail = loginEmail;

});

//middleware! - after login and register request
router.use(function (req, res, next) {

    var token = req.header('Authorization');

    try {
        var decoded = jwt.verify(token, 'cycling');
        console.log('token valid');

    } catch(err) {
        console.log(token);
        console.log("invalid token :O");
    }

    //no token or unauthorised
    if(!token || !decoded) {
        console.log('token: '+ token);
        console.log('decoded: ' + decoded);
        res.statusCode = 401; //keeps hitting here
        res.send();
    } else {
        req.auth = decoded.data;
        next();
    }

});

//SPORT

router.post('/sport', function(req, res, next) {

    console.log("Adding new results");
    
    var newSport = req.body;

    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        db.collection('fitness-results').insertOne(newSport, function (err, result) {
            assert.equal(null, err);
            console.log('Sport added to Mongo');
            db.close();
            res.json(newSport);
        });
        db.close();
    });
});

//WALL

router.get('/wall', function(req, res, next) {

    MongoClient.connect(url, function (err, db) {
        var col = db.collection('fitness-results');
        console.log('email: ' + currentAccountEmail);

        col.find({
            'user.email': currentAccountEmail
        }).toArray(function (err, docs) {
            res.json(docs);
        });
        console.log('Fitness results found in Mongo :D');
        db.close();
    });

});

router.delete('/wall/delete/:id', function(req, res, next) {

    MongoClient.connect(url, function (err, db) {
        db.collection('fitness-results').remove({
            _id: new mongo.ObjectID(req.params.id)
        }, function (err, doc) {
            console.log(doc);
            res.json(doc);
        });

        db.close();
    });
});

router.post('/wall/comment/:id', function(req, res, next) {

    console.log("Posting new comment");

    var newComment = req.body;

    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        db.collection('fitness-results').insertOne(newSport, function (err, result) {
            assert.equal(null, err);
            console.log('Sport added to Mongo');
            db.close();
            res.json(newSport);
        });
        db.close();
    });
});

router.post('/wall/comment/:id', function(req, res, next) {

    console.log("posting comment");
    var comment = req.body.comment;

    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        db.collection('fitness-results').update({
            _id: new mongo.ObjectID(req.params.id)
        },{
            $set: { email: comment }
        }, function (err, doc) {
            res.json(doc);
        });
        db.close();
    });
});

router.post('/wall/wow/:id', function(req, res, next) {

    console.log("adding wow");
    //var addWow = req.body.wow;

    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        db.collection('fitness-results').update({
            _id: new mongo.ObjectID(req.params.id)
        },{
            $inc: { wow: 1 }
        }, function (err, doc) {
            res.json(doc);
        });
        db.close();
    });
});

//USER ACCOUNT


router.delete('/account/delete/:id', function(req, res, next) {

    MongoClient.connect(url, function (err, db) {
        db.collection('user-accounts').remove({
            _id: new mongo.ObjectID(req.params.id)
        }, function (err, doc) {
            console.log(doc);
            res.json(doc);
        });

        db.close();
    });
});

router.post('/account/edit/:id', function(req, res, next) {

    console.log("Updating email");
    var newEmail = req.body.email;

    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        db.collection('user-accounts').update({
            _id: new mongo.ObjectID(req.params.id)
        },{
            $set: { email: newEmail }
        }, function (err, doc) {
            res.json(doc);
        });
        db.close();
    });
});

router.get('/account/users', function(req, res, next) {

    MongoClient.connect(url, function (err, db) {
        var col = db.collection('fitness-results');
        col.count({
            'email': { $ne: currentAccountEmail }
        });
        res.json(col);
        console.log('count of results for ' + currentAccountEmail + ' complete');
        db.close();
    });

});

//Fetch GPX Data
router.get('/wall/gpx', function (req, res, next) {
    gpxParse.parseGpxFromFile('./gpx/route.gpx', function(error, data) {
        console.log("DATA::" + data);
        res.json(data);
    });
});

module.exports = router;
