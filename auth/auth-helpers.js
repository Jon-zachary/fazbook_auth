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

//function will return a 401 status error if a user tries to log in
//while already logged in, otherwise will neturn next which will execute the next 
//piece of code from where it was called.
function loginRedirect(req,res,next) {
  if(req.user) return res.status(401).json(
    { status: 'You are already logged in' });
    return next();
}

//function will create a user, using the sequelize
//models.create method. It also encrypts and salts the
//hash using bcrypt. after it's done it redirects to '/'
function createUser(req,res) {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(req.body.password, salt);

  return models.User.create({
    username: req.body.username,
    password: hash,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    dob: req.body.dob
  }).then(() => {
    res.redirect('/');
  });
}

