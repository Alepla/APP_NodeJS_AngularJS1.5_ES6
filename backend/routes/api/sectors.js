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

/*
Projects.aggregate().project({sector:1}).group({_id:"$sector","count":{$sum:1}}).sort({count:-1,_id:1}).exec((err,sectors) => {
    console.log(err)
    console.log(sectors)
    res.json({sectors: sectors});
  })
*/
//db.projects.aggregate({$project:{sector:1}},{$group:{_id:"$sector","count":{$sum:1}}},{$sort:{count:-1,_id:1}})