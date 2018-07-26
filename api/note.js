var express = require('express');
var router = express.Router();
var Note = require("../models/note");
var Banner = require("../models/banner");

router.get('/notelist', function(req, res, next) {

    Note.find({}, function(err,result){
        if(err){
            console.log("Error:" + err);
            res.send(err);
        }else{
            console.log("Res:" + result);
            res.send(result);
        }
    }).limit(20);

});


router.get('/banners', function(req, res, next) {

    Banner.find({}, function(err,result){
        if(err){
            console.log("Error:" + err);
            res.send(err);
        }else{
            console.log("Res:" + result);
            res.send(result);
        }
    }).limit(4);

});

module.exports = router;
