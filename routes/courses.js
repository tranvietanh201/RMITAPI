
const app = require('express');

const router = app.Router();

const mongoose = require('mongoose');

//Course model
var CourseSchema = new mongoose.Schema({
   id: String,
   name: String
})
var Course = mongoose.model('Course', CourseSchema)

router.get('/', function (req, res) {
   Course.find({}, function (err, courses) {
      res.send(courses)
   })
})

router.post('/', function (req, res) {
   Course.create(req.body, function (err, courses) {
      res.send(courses)
   })
})

router.delete('/:id', function (req, res) {
   Course.deleteOne({ id: req.params.id }, function (err, result) {
      res.send(result)
   })
})

router.put('/', function (req, res) {
   Course.findOneAndUpdate({ id: req.body.id }, { name: req.body.name }, function (err, result) {
      res.send(result)
   })
})


router.get('/search/:keyword', function (req, res) {
   Course.find({ name: req.params.keyword }, function (err, result) {
      res.send(result)
   })
})

router.get('/:id', function (req, res) {
   Course.find({ id: req.params.id }, function (err, result) {
      res.send(result)
   })
})

router.get('/:name', function (req, res) {
   Course.find({ name: req.params.name }, function (err, result) {
      res.send(result)
   })
})

module.exports = router;
