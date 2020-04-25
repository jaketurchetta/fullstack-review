const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  id: {type: Number, unique: true},
  name: String,
  owner: { id: Number,
          login: String,
          url: String,
          repos_url: String },
  url: String,
  html_url: String,
  description: String
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repos) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  let container = [];
  for (let i = 0; i < repos.length; i ++) {
    let repo = repos[i];
    let doc = new Repo({
      id: repo.id,
      name: repo.name,
      owner: { id: repo.owner.id,
              login: repo.owner.login,
              url: repo.owner.url,
              repos_url: repo.owner.repos_url },
      url: repo.url,
      html_url: repo.html_url,
      description: repo.description
    })
    container.push(doc);
    doc.save((err, request) => {
      if (err) {
        console.log('Error saving doc to database: ', err)
      } else {
        console.log('Successful db save!')
      }
    })
  }
}

// create helper function that calls Repo.find

let read = (callback) => {
  Repo.find({}).limit(25).sort({id: -1}).exec((err, res) => {
    if (err) {
      console.log('DB read error: ', err);
    } else {
      callback(res);
    }
  })
}

module.exports.save = save;
module.exports.read = read;