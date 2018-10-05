var router = require('express').Router();
var mongoose = require('mongoose');
var Projects = mongoose.model('Projects');
var Users = mongoose.model('User');

router.get('/', function(req, res, next) {
    Projects.find().then(function(projects){
      return res.json({projects: projects});
    }).catch(next);
});

router.get('/:users', function(req, res, next) {
  Users.find().then(function(users){
    return res.json({users: users});
  }).catch(next);
});

router.delete('/:id', function(req, res, next) {
  //console.log(req.params.id);
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
