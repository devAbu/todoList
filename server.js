const express = require('express');
const app = express();

const bodyparser = require("body-parser");

app.use(express.static(__dirname + '/static'));
app.use(express.json()); // to support JSON-encoded bodies
app.use(bodyparser.json());
var urlencodedParser = bodyparser.urlencoded({
  extended: false
})

var mongojs = require('mongojs');
 var db = mongojs('itemList', ['itemList']);

app.get('/itemList', function (req, res) {
  console.log('I received a GET request');

  db.itemList.find(function (err, docs) {
    console.log(docs);
    res.json(docs);
  });
});

app.post('/itemList', function (req, res) {
  console.log(req.body);
  db.itemList.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});

app.delete('/itemList/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.itemList.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.get('/itemList/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.itemList.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.put('/itemList/:id', function (req, res) {
  var id = req.params.id;
  console.log(req.body.date);
  db.itemList.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {date: req.body.date, description: req.body.description}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});

app.listen(3000, function(){
  console.log('App is running on port 3000')
})
