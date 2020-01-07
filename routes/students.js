
const app = require('express');

const router = app.Router();

const mongoose = require('mongoose');




//Course model
var StudentSchema = new mongoose.Schema({
   id: String,
   name: {type: String, required: true},
   year: {type: String, required: true}
});

var Student = mongoose.model('Student', StudentSchema)


router.get('/', function (req, res) {
   Student.find({}, function (err, students) {
      res.send(students)
   })
})

router.post('/', function (req, res) {
   Student.create(req.body, function (err, students) {
      res.send(students)
   })
})

router.delete('/:id', function (req, res) {
   Student.deleteOne({ id: req.params.id }, function (err, result) {
      res.send(result)
   })
})

router.put('/', function (req, res) {
   const filter = {id:req.body.id};
   const update = {name:req.body.name, year:req.body.year};
   Student.findOneAndUpdate(filter,update, function (err, result) {
      res.send(result)
   })
})


router.get('/search/:keyword', function (req, res) {
   Student.find({ name: req.params.keyword }, function (err, result) {
      res.send(result)
   })
})


router.get('/search', function(req, res){
   Student.find({name: {$regex: req.query.name}}, function(err, students){
       res.send(students)
   })
})


 

 
module.exports = router;