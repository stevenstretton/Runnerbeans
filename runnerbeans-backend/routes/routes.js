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
            
            if (!doc.password) {
                
                res.statusCode = 400;
                res.statusText = 'Incorrect login credentials';
                res.send({err:res.statusText},500);
                
            } else {
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
                        console.log('User found from Mongo :D');
                    } else if (valid == false) {
                        res.json({
                            "login": "incorrect"
                        });
                        console.log('incorrect password :(');
                    }
                });
            }
            
        });
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
        res.statusCode = 401;
        res.send();
    } else {
        req.auth = decoded.data;
        next();
    }

});

//SPORT

router.post('/sport', function(req, res, next) {
    var gpxData;

        console.log("Adding new results");
    gpxParse.parseGpxFromFile('./gpx/route.gpx', function(error, data){
        if(error){
            res.statusCode = 500;
            res.statusText = 'Unable to parse gpx';
            res.send({err:res.statusText},500);
        }
        else{
            
            gpxData = data;
            
            var newSport = req.body;
            newSport.waypoints = gpxData.waypoints;
        
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
        }
    });
});

//WALL

//get the current logged in users results
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

//get every users results
router.get('/wall/all', function(req, res, next) {

    MongoClient.connect(url, function (err, db) {
        var col = db.collection('fitness-results');
        col.find({}).toArray(function (err, docs) {
            res.json(docs);
        });
        console.log('All fitness results found in Mongo :D');
        db.close();
    });

});

//Post GPX Data
router.post('/wall/gpx:id', function (req, res, next) {
    gpxParse.parseGpxFromFile('./gpx/route.gpx', function(error, data) {
        console.log("DATA::" + data);
        if(data)
        {
            res.json(data);
        }
        else {
            MongoClient.connect(url, function (err, db) {
                assert.equal(null, err);
                db.collection('fitness-results').update({
                    _id: new mongo.ObjectID(req.params.id)
                },{
                    $set: {
                        gpx: data
                    }
                });

            })
        }

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


module.exports = router;
