var db = require('../db');
var crypto = require('crypto');


module.exports = function() {

  db.serialize(function() {
    db.run("CREATE TABLE IF NOT EXISTS users ( \
      username TEXT UNIQUE, \
      hashed_password BLOB, \
      salt BLOB, \
      name TEXT \
    )");
    let salt = crypto.randomBytes(16);
    crypto.pbkdf2('RickyTom15', salt, 10000, 32, 'sha256', function(err, hashedPassword) {
      db.get('SELECT rowid AS id, * FROM users WHERE username = ?', [ 'common' ], function(err, row) {
        if (!row) {
          db.run('INSERT INTO users (username, hashed_password, salt, name) VALUES (?, ?, ?, ?)', [
            'common',
            hashedPassword,
            salt,
            'Common'
          ], function(err) {
            if (err) { return next(err); }

            var user = {
              id: this.lastID.toString(),
              username: 'common',
              displayName: 'Common'
            };
            req.login(user, function(err) {
              if (err) { return next(err); }
              res.redirect('/');
            });
          });
        }
      });
    });
  });

  //db.close();

};
