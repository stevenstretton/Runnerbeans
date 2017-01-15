var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var assert = require('assert');
var bcrypt = require('bcrypt');

var url = 'mongodb://localhost:27017/runnerbean';

// https://www.youtube.com/watch?v=bf8L9tQi_MQ&list=PL55RiY5tL51oGJorjEgl6NVeDbx_fO5jR&index=9

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
    var hash = bcrypt.hashSync(req.body.password, salt); //encrypts the password from the
    var newAccount = req.body;

    console.log(hash);
    newAccount.password = hash;

    mongo.connect(url, function (err, db) {
        assert.equal(null, err);
        db.collection('user-accounts').insertOne(newAccount, function (err, result) {
            assert.equal(null, err);
            console.log('User added to Mongo');
            db.close();
            res.json(newAccount);
        });
    });

});

router.get('/login', function(req, res, next) {
    console.log("register");
});

router.post('/login', function(req, res, next) {

    var loginEmail = req.body.email;

    mongo.connect(url, function (err, db) {
        var col = db.collection('user-accounts');
        col.findOne({
                'email': loginEmail
        }).toString(function (err, result) {
            if (err) {
                console.log('Something went wrong :(');
                res.send(err);
            } else if (result.length){
                console.log('User found from Mongo :D');
                res.render(result);
            } else {
                console.log('No Result :/');
                res.send("no result");
            }
        });
        db.close();
    });

});

router.get('/logout', function(req, res, next) {

});

router.post('/logout', function(req, res, next) {

});


module.exports = router;
