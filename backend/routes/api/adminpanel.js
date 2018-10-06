var router = require('express').Router();
var mongoose = require('mongoose');
var Projects = mongoose.model('Projects');
var Users = mongoose.model('User');

router.get('/', function(req, res, next) {
    Projects.find().then(function(projects){
      return res.json({projects: projects});
    }).catch(next);
});

router.get('/users', function(req, res, next) {
  Users.find().then(function(users){
    return res.json({users: users});
  }).catch(next);
});

router.delete('/:slug', function(req, res, next) {
  Projects.findOne({slug: req.params.slug}).then(function(project){
    if (!project) { 
      return res.sendStatus(401); 
    }else {
      return project.remove().then(function(){
        return res.sendStatus(204);
      });
    }

  }).catch(next);
});

router.get('/:id', function(req, res, next) {
  Users.findOne({_id: req.params.id}).then(function(user){
    return res.json({user: user});
  }).catch(next);
});

router.put('/', function(req, res, next) {
  console.log(req.body);
  var myQuery = { _id: req.body.id };
  var newValues = {$set: {username:req.body.username, email:req.body.email, type:req.body.type}};
  Users.update(myQuery, newValues, 
  function(err, project){
      if(err){
          res.send(false);
      }else{
          res.send(true);
      }
  });
});

router.delete('/:id', function(req, res, next) {
  Users.findById(req.params.id).then(function(user){
    if (!user) { 
      return res.sendStatus(401); 
    }else {
      return user.remove().then(function(){
        return res.sendStatus(204);
      });
    }

  }).catch(next);
});

module.exports = router;
