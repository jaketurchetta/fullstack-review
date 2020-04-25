const github = require('../helpers/github.js');
const db = require('../database/index.js');
const _ = require('underscore');
const bodyParser = require('body-parser');
const express = require('express');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  // console.log(req.body);
  // console.log(req.body.username);
  // console.log(db);
  let body = req.body;
  // console.log(body);
  github.getReposByUsername(req.body.username, (body) => {
      db.save(JSON.parse(body));
      res.status(200).send('Repos successfully posted!');
  });
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  // load top 25 repos
  // send to the client
  db.read((results) => {
    res.status(200).send(results)
  })
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

