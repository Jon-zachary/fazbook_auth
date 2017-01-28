//loads passport module
const passport = require('passport');
//loads model object from sequelize
const models = require('../db/models/index');

//creates a user id object that can be stored in session 
//memory and can be used later in a usable(json) format.
module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    models.User.findById(id)
    .then((user) => { done(null, user); })
    .catch((err) => { done(err, null); });
  });
};
