var router = require('express').Router();
var mongoose = require('mongoose');
var Projects = mongoose.model('Projects');

router.get('/', function(req, res, next) {
    Projects.find().then(function(projects){
        console.log(projects);
      return res.json({projects: projects});
    }).catch(next);
});

router.post('/', function(req, res, next) {
    console.log(req.body);
    Projects.create({name:req.body.name,company:req.body.company,goal:req.body.goal,sector:req.body.sector,rewards:req.body.rewards,desc:req.body.desc},
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
    Projects.update({name:req.body.name,company:req.body.company,goal:req.body.goal,sector:req.body.sector,rewards:req.body.rewards,desc:req.body.desc},
            function(err, project){
                if(err){
                    res.send(false);
                }else{
                    res.send(true);
                }
            });
});

router.get('/:id', function(req, res, next) {
    Projects.findById(req.params.id).then(function(projects){
    if(!projects){ return res.sendStatus(401); }
        return res.json({projects: projects});
    }).catch(next);
});

module.exports = router;
