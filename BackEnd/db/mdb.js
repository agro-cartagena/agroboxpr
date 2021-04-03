//Handles connection to database. Passes db connection to db layer.

var MongoClient = require('mongodb').MongoClient

var state = {
  db: null,
}

exports.connect = async function(url, done) {
  if (state.db) return done()

  await MongoClient.connect(url, { useUnifiedTopology: true }).then((db) => {
    state.db = db
    return done()
  }).catch((err) => {
    return done(err)
  })
}

exports.get = function() {
  return state.db
}

exports.close = function(done) {
  if (state.db) {
    state.db.close(function(err, result) {
      state.db = null
      state.mode = null
      done(err)
    })
  }
}