const express = require('express');
const router = express.Router();

const authHelpers = require('../auth/auth-helpers');

/* GET user profile page. */
// add route here
//function defines a route for get '/'. calls the authHelper loginRequired
//method that throws an error if they're not logged in
//otherwise renders the user/index ejs template with params
//user: req.user.datavalues
router.get('/', authHelpers.loginRequired, (req,res,next) => {
  res.render('user/index', {
    user: req.user.dataValues
  });
});

module.exports = router;
