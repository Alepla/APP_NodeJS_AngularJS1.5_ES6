//JS Contact backend
var router = require('express').Router();
var mongoose = require('mongoose');
var email = require('../../utils/email.js');

router.post('/', function(req, res, next) {
	email.sendEmail(req,res);
});

module.exports = router;
