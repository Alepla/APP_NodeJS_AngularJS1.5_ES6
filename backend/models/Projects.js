var mongoose = require('mongoose');

var ProjectsSchema = new mongoose.Schema({
    name: String,
    goal: Number,
    description: String,
    owner: String
}, {timestamps: true});

mongoose.model('Projects', ProjectsSchema);
