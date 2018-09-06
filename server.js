const express = require('express');
const app = express();

const bodyparser = require("body-parser");

app.use(express.static(__dirname + '/static'));
app.use(express.json()); // to support JSON-encoded bodies
app.use(bodyparser.json());
var urlencodedParser = bodyparser.urlencoded({
  extended: false
})

app.listen(3000, function(){
  console.log('App is running on port 3000')
})
