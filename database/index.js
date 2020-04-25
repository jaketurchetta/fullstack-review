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
  description: String
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repo) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  let doc = new Repo({
    id: repo.id,
    name: repo.name,
    owner: { id: repo.owner.id,
            login: repo.owner.login,
            url: repo.owner.url,
            repos_url: repo.owner.repos_url },
    url: repo.url,
    description: repo.description
  })
  doc.save((err, data) => {
    if (err) {
      console.log('Error saving doc to database: ', err)
    } else {
      console.log('Successful db save')
    }
  })
}

module.exports.save = save;