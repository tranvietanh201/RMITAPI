
const app = require('express');

const router = app.Router();

const mongoose = require('mongoose');

//Course model
var ProjectSchema = new mongoose.Schema({
   student: [Object],
   assignment: [Object],
   name: String,
   course: [Object],
   semester: String,
   technology: String,
   scope: String,
   description: String,
   industrial_link: String,
   application: String,
   photo: Array
})
var Project = mongoose.model('Project', ProjectSchema)

router.get('/', function (req, res) {
   Project.find({}, function (err, projects) {
      res.send(projects)
   })
})

router.get('/:_id', function (req, res) {
   Project.findOne({_id:req.param._id}, function (err, projects) {
      res.send(projects)
   })
})

router.post('/', function (req, res) {
   Project.create(req.body, function (err, projects) {
      res.send(projects)
   })
})

router.delete('/:_id', function (req, res) {
   Project.deleteOne({ _id: req.params._id }, function (err, result) {
      res.send(result)
   })
})

router.put('/', function (req, res) {
   const filter = {name:req.body.name};
   const update = {industrial_link: req.body.industrial_link, scope: req.body.scope ,
   semester:req.body.semester, description:req.body.description,technology:req.body.technology,student:req.body.student, course:req.body.course, assignment:req.body.assignment};

   Project.findOneAndUpdate(filter,update,function (err, result) {
      res.send(result)
   })
})


router.get('/search/:keyword', function (req, res) {
   Project.find({ course: req.params.course }, function (err, result) {
      res.send(result)
   })
})

router.get('/search', function(req, res){
   Project.find({scope: {$regex: req.query.scope}}, function(err, result){
       res.send(result)
   })
})

router.get('/search', function(req, res){
   if (req.query.name != undefined){
      Project.find({name: {$regex: req.query.name}}, function(err, result){
         res.send(result)
     })
   }
   if (req.query.scope  != undefined){
      Project.find({scope: {$regex: req.query.scope}}, function(err, result){
         res.send(result)
     })
   }
   if (req.query.industrial_link != undefined){
      Project.find({industrial_link: {$regex: req.query.industrial_link}}, function(err, result){
         res.send(result)
     })
   }
   if(req.query.application != undefined){
      Project.find({application: {$regex: req.query.application}}, function(err, result){
         res.send(result)
     })
   }
   if(req.query.semester != undefined){
      Project.find({semester: {$regex: req.query.semester}}, function(err, result){
         res.send(result)
     })
   }
   if(req.query.technology != undefined){
      Project.find({technology: {$regex: req.query.technology}}, function(err, result){
         res.send(result)
     })
   }
})




module.exports = router;
