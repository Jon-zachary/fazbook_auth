//loads express and express router
const express = require('express');
const router = express.Router();

//loads auth-helpers for the helper functions
//loads the passport local strategy as passport
const authHelpers = require('../auth/auth-helpers');
const passport = require('../auth/local');

//defines a route for a get request to /register 
//uses a route handler we will write called login redirect
//whihc will redirect an already logged in use to their profile page 
//or render the auth/register.ejs file
router.get('/register', authHelpers.loginRedirect, (req,res)=>{
  res.render('auth/register');
});

//defines a route for a post request to /register
//uses a custom createUser method we will write 
//in auth-helpers to create a new user in our db
//and console log a success message.
router.post('/register', (req, res, next)  => {
  return authHelpers.createUser(req, res)
  .then((response) => {
    console.log('registration successful');
  })
  .catch((err) => { res.status(500).json({ status: 'error' }); });
});



//defines a route for get auth/login. calls
//login redirect  and if they're ot logged in 
//renders the auth/login ejs page
router.get('/login',authHelpers.loginRedirect, (req, res)=> {
  res.render('auth/login');
});

//defines a route for post /login using the local strategy
//from the passport middleware we defined our specific local
//strategy in auth/local.
router.post('/login', passport.authenticate('local', {
  successRedirect: '/user',
  failureRedirect: '/auth/login',
  failureFlash: true
  })
);

//defines a route for get /logout...looks like 
//the logout method is acutally from express not pasport
router.get('/logout', (req,res) =>{
  req.logout();
  res.redirect('/');
});

//makes the router module available to the rest
module.exports = router;






