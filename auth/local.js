//loads the passport module along with the local
//strategy which will we will use for authentication.

const passport  = require('passport');
const LocalStrategy = require('passport-local').Strategy;

//loads models from sequelize and auth-helper functions.
//also load sthe init method from auth/passport.js
const init = require('./passport');
const models = require('../db/models/index');
const authHelpers = require('../auth/auth-helpers');

const options ={};

init();
//this function creates a new instance of the local strategy object
//we loaded from passport-local, initalized with user info and an empty object for options. 
//It then checks to see if  the user exists in the db model and wheather the supplied password
//matches the password in the db model. If either of these are true it returns false,
//if neither are true it returns user information
passport.use(new LocalStrategy(options, (username, password, done) => {
  models.User.findAll({
    where: {
      username
    }
  })
  .then((user) => {
    if (user[0] === undefined) {
      return done(null, false);
    }
    if (!authHelpers.comparePass(password, user[0].dataValues.password)) {
      return done(null, false);
    } else {
      return done(null, user[0].dataValues);
    }
  })
  .catch((err) => { return done(err); });
}));

module.exports = passport;



