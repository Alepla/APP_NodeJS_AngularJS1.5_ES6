var router = require('express').Router();
var mongoose = require('mongoose');
var Projects = mongoose.model('Projects');
var stripe = require("stripe")("sk_test_7W6ARqArOyH4LUymB6hmbFTr");
var multer = require('multer');
var fs = require('fs');
global.mediaUpload = [];

router.get('/', function(req, res, next) {
    Projects.find().then(function(projects){
        console.log(projects);
      return res.json({projects: projects});
    }).catch(next);
});

router.post('/', function(req, res, next) {
    if(mediaUpload.length < 1){
        res.json({err:"Need upload 1 file"});
    }else{
        Projects.create({name:req.body.name,company:req.body.company,goal:req.body.goal,sector:req.body.sector,rewards:req.body.rewards,aids:req.body.aids,desc:req.body.desc,media:mediaUpload,author:req.body.author, investedMoney: 0,type:req.body.type},
            function(err, project){
                console.log(err)
                if(err){
                    if(err.code === 11000)
                        res.json({err:"The name project is created"});
                    else
                        res.json({err:"Error when saving the project"});
                }else{
                    mediaUpload = [];
                    res.json({err:false});
                }
            });
    }
});

router.get('/cleardata',function(req,res){
    if(mediaUpload.length > 0){
        mediaUpload.map((media) => {
            fs.unlink('./public/uploads/'+media.toString().split('-')[1],function(err){
                console.log(err)
            });
        });
        mediaUpload = [];
        res.send(true);
    }else{
        res.send(true);
    }
})

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
    if(req.body.projType === "normal"){
        var updateMoney = {$inc: {investedMoney: req.body.projM}, $push: {inversors: req.body.userID}};
    }else if(req.body.projType === "monthly"){
        var updateMoney = {$inc: {investedMoney: req.body.projM}, $push: {subscribers: {user:req.body.userID,money:req.body.projM}}};
    }
    Projects.update(Query, updateMoney, function(err) {
        if(!err){
            const token = req.body.id; 

            const charge = stripe.charges.create({
                amount: req.body.projM * 100,
                currency: 'eur',
                description: 'CrowCode charge',
                source: token,
            }, function(err){
                if(err) {
                    res.send(false);
                }else {
                    res.send(true);
                }
            });
        }else {
            res.send(false);
        }
    });
});

router.put('/aids/link', function(req, res) {
    Projects.update({_id: req.body.project},{$pull:{aids:{_id:req.body.aids._id}}}, 
    function(err) {
        if(err){
            res.send({error:err});
        }else{
            Projects.update({_id: req.body.project},{$push:{aids:{"_id" : req.body.aids._id, "title" : req.body.aids.title, "percentage" : req.body.aids.percentage, "desc" : req.body.aids.desc, "state" : 2,link: req.body.link,"user" :req.body.user}}},function(err){
                if(err){
                    res.send({error:err});
                }else{
                    res.send(true);
                }
            })
        }
    });
});

var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './public/uploads/');
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        let nrand = Math.random().toString().split('.')[1];
        if(mediaUpload.length < 5){
            mediaUpload.push(file.mimetype.split('/')[0] + '-'+ nrand + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
            cb(null, nrand + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
        }else{
            cb(null,'');
        }
    }
});

var upload = multer({ //multer settings
                storage: storage
            }).single('file');

/** API path that will upload the files */
router.post('/media/upload', function(req, res) {
    upload(req,res,function(err){
        if(err){
            res.json({err:"Max 5 files",media:mediaUpload});
        }else{
            mediaUpload.forEach(value => {
                console.log(value);
            });
            res.json({media:mediaUpload})
        }
    });
});
router.post('/media/delete/:file', function(req, res) {
    fs.unlink('./public/uploads/'+req.params.file.toString().split('-')[1],function(err){
        if(err) res.json({err:"error",media:mediaUpload});
        mediaUpload.splice(mediaUpload.indexOf(req.params.file.toString()),1); 
        res.json({media:mediaUpload});
   });
});


module.exports = router;
