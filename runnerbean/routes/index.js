var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var assert = require('assert');

var url = 'mongodb://localhost:27017/runnerbean';

// https://www.youtube.com/watch?v=bf8L9tQi_MQ&list=PL55RiY5tL51oGJorjEgl6NVeDbx_fO5jR&index=9

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home', success: req.session.success, errors: req.session.errors});
  req.session.errors = null;
  req.session.success = null;
});

router.post('/signup', function(req, res, next){
    req.check('email', 'Invalid email').isEmail();
    req.check('password', 'Invalid password').isLength({min: 4}).equals(req.body.confirmPassword);

    var errors = req.validationErrors();

    if(errors) {
        req.session.errors = errors;
        req.session.success = false;
    } else {
        req.session.success = true;

        var user = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        };

        mongo.connect(url, function (err, db) {
            assert.equal(null, err);
            db.collection('user-accounts').insertOne(user, function (err, result) {
                assert.equal(null, err);
                console.log('User added to Mongo');
                db.close();
            });
        });

    }


    res.redirect('/');
});

router.get('/get-data', function (req, res, next) {

});


router.get('/update', function (req, res, next) {

});


router.get('/delete', function (req, res, next) {

});

router.get('/about', function(req, res, next) {
  res.send('some about us page!');
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Sign in'});
});

module.exports = router;
