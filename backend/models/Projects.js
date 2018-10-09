var mongoose = require('mongoose');
var slug = require('slug');
var User = mongoose.model('User');

var ProjectsSchema = new mongoose.Schema({
    slug: {type: String, lowercase: true, unique: true},
    name: String,
    company: String,
    goal: Number,
    sector: String,
    rewards: Array,
    desc: String,
    media: Array,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    investedMoney: Number,
    inversors: Array
}, {timestamps: true});

ProjectsSchema.pre('validate', function(next){
  if(!this.slug)  {
    this.slugify();
  }

  next();
});

ProjectsSchema.methods.slugify = function() {
  this.slug = slug(this.name);
};

ProjectsSchema.methods.toJSONFor = function(user){
  return {
    slug: this.slug,
    name: this.name,
    company: this.company,
    goal: this.goal,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
    sector: this.sector,
    desc: this.desc,
    author: this.author.toProfileJSONFor(user)
  };
};

mongoose.model('Projects', ProjectsSchema);
