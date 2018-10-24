var router = require('express').Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Projects = mongoose.model('Projects');
var auth = require('../auth');

// Preload user profile on routes with ':username'
router.param('username', function(req, res, next, username){
  User.findOne({username: username}).then(function(user){
    if (!user) { return res.sendStatus(404); }

    req.profile = user;

    return next();
  }).catch(next);
});

router.get('/:username', auth.optional, function(req, res, next){
  if(req.payload){
    User.findById(req.payload.id).then(function(user){
      if(!user){ return res.json({profile: req.profile.toProfileJSONFor(false)}); }

      return res.json({profile: req.profile.toProfileJSONFor(user)});
    });
  } else {
    return res.json({profile: req.profile.toProfileJSONFor(false)});
  }
});

router.get('/:id/projects', function(req, res, next) {
  Projects.find({author:req.params.id}).then(function(projects){
  if(!projects){ return res.sendStatus(401); }
      return res.json({projects: projects});
  }).catch(next);
 });

 router.get('/:id/projects/invested', function(req, res, next) {
   //console.log(req.params);
  Projects.find({inversors:req.params.id}).then(function(projects){
  if(!projects){ return res.sendStatus(401); }
      return res.json({projects: projects});
  }).catch(next);
 });
 
 router.get('/:id/projects/subscribe', function(req, res, next) {
  //console.log(req.params);
 Projects.find({"subscribers.user":req.params.id}).then(function(projects){
 if(!projects){ return res.sendStatus(401); }
     return res.json({projects: projects});
 }).catch(next);
});

router.put('/projects/unsubscribe', function(req, res, next) {
 Projects.update({"slug" : req.body.project},{$pull:{"subscribers":{user:req.body.user}}}).then(function(response){
    if(!response){ return res.sendStatus(401); }
    return res.json({res: true});
 }).catch(next);
});

router.put('/aids/accept', function(req, res, next) {
  console.log(req.body)
  Projects.update({_id: req.body.project},{$pull:{aids:{_id:req.body._id}}}, 
    function(err) {
        if(err){
            res.send({error:err});
        }else{
            Projects.update({_id: req.body.project},{$push:{aids:{"_id" : req.body._id, "title" : req.body.title, "percentage" : req.body.percentage, "desc" : req.body.desc, "state" : 1,link: req.body.link,"user" :req.body.user}}},function(err){
                if(err){
                    res.send({error:err});
                }else{
                    res.send(true);
                }
            })
        }
    });
});

router.put('/aids/cancel', function(req, res, next) {
  console.log(req.body)
  Projects.update({_id: req.body.project},{$pull:{aids:{_id:req.body._id}}}, 
    function(err) {
        if(err){
            res.send({error:err});
        }else{
            Projects.update({_id: req.body.project},{$push:{aids:{"_id" : req.body._id, "title" : req.body.title, "percentage" : req.body.percentage, "desc" : req.body.desc, "state" : 0,link: "","user" :""}}},function(err){
                if(err){
                    res.send({error:err});
                }else{
                    res.send(true);
                }
            })
        }
    });
});

router.get('/aids/aidsparticiped/:id', function(req, res, next) {
  Projects.find({"aids.user":req.params.id,"aids.state":1}).then((aids) => {
    if(aids){
      res.json({aids:aids});
    }else{
      res.send(false);
    }
  })
});


module.exports = router;
