var router = require('express').Router();
var mongoose = require('mongoose');
var Projects = mongoose.model('Projects');

router.get('/', function(req, res, next) {
    Projects.find().then(function(projects){
      return res.json({projects: projects});
    }).catch(next);
});

module.exports = router;
