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
  console.log(req.body)
 Projects.update({"slug" : req.body.project},{$pull:{"subscribers":{user:req.body.user}}}).then(function(response){
    if(!response){ return res.sendStatus(401); }
    return res.json({res: true});
 }).catch(next);
});

module.exports = router;
