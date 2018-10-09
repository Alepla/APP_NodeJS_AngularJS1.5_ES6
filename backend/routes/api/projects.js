var router = require('express').Router();
var mongoose = require('mongoose');
var Projects = mongoose.model('Projects');
var stripe = require("stripe")("sk_test_7W6ARqArOyH4LUymB6hmbFTr");

router.get('/', function(req, res, next) {
    Projects.find().then(function(projects){
        console.log(projects);
      return res.json({projects: projects});
    }).catch(next);
});

router.post('/', function(req, res, next) {
    console.log(req.body);
    Projects.create({name:req.body.name,company:req.body.company,goal:req.body.goal,sector:req.body.sector,rewards:req.body.rewards,desc:req.body.desc,author:req.body.author},
    function(err, project){
        if(err){
            res.send(false);
        }else{
            res.send(true);
        }
    });
});

router.put('/', function(req, res, next) {
    console.log(req.body);
    var myQuery = { _id: req.body.oldID };
    var newValues = {$set: {name:req.body.name,company:req.body.company,goal:req.body.goal,sector:req.body.sector,rewards:req.body.rewards,desc:req.body.desc}};
    Projects.update(myQuery, newValues, 
    function(err, project){
        if(err){
            res.send(false);
        }else{
            res.send(true);
        }
    });
});

router.get('/:slug', function(req, res, next) {
    console.log(req.params.slug);
    Projects.findOne({slug: req.params.slug}).then(function(projects){
    if(!projects){ return res.sendStatus(401); }
        return res.json({projects: projects});
    }).catch(next);
});

router.put('/pay', function(req, res, next) {
    console.log(req.body);
    var Query = { _id: req.body.idP };
    var updateMoney = {$inc: {investedMoney: req.body.projM}, $push: {inversors: req.body.userID}};
    Projects.update(Query, updateMoney, function(err) {
        if(err){
            res.send(false);
        }else {
            res.send(true);
        }
    });
    const token = req.body.id; 

    const charge = stripe.charges.create({
        amount: req.body.projM * 100,
        currency: 'eur',
        description: 'CrowCode charge',
        source: token,
    });
});

module.exports = router;
