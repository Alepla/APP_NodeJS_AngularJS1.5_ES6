var mongoose = require('mongoose');
var User = mongoose.model('User');

var ProjectsSchema = new mongoose.Schema({
    name: String,
    company: String,
    goal: Number,
    sector: String,
    rewards: Array,
    desc: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {timestamps: true});

mongoose.model('Projects', ProjectsSchema);
