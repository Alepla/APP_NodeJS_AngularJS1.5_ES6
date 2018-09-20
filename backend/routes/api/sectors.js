var router = require('express').Router();
var mongoose = require('mongoose');
var Projects = mongoose.model('Projects');

// return a list of tags
router.get('/', function(req, res, next) {
 Projects.find().distinct('sector').then(function(sectors){
   return res.json({sectors: sectors});
 }).catch(next);
});

module.exports = router;

