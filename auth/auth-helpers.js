//loads the bcyrpt modul for password hashing
const bcrypt = require('bcryptjs');
//loads the models object we created with serialize
//so we can talk to our psql db
const models = require('../db/models/index');

//function uses a bcrypt method to compare a user password
//and an encrypted db password, returns a bool.
function comparePass(userPassword,databasePassword) {
  return bcrypt.compareSync(userPassword,databasePassword);
}
