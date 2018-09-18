var mongoose = require('mongoose');

var ProjectsSchema = new mongoose.Schema({
    name: String,
    company: String,
    goal: Number,
    sector: String,
    rewards: Array,
    desc: String
}, {timestamps: true});

mongoose.model('Projects', ProjectsSchema);
