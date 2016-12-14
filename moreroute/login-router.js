const router = require("express").Router();
const User = require("../models/user-model")


function userLogin(req,res){
	 console.log('Session:', req.session);
  var userInfo = req.body;
  User.sync()
  //check if user exists
  .then(() => {
    return User.findOne({
      where: {
        username: userInfo.username
      }
    })
  })
  .then((user) => {
    //IF user exists, check if password is correct
    if(user && user.password === userInfo.password) {
      console.log('Password is correct!')
      return user;
    //ELSE IF user does not exist, create new user
    } else if(!user) {
      console.log('Creating new user!');
      return User.create(userInfo);
    } else {
      return null;
    }
  })
  .then((user) => {
    if(user) {
      req.session.username = user.username;
      req.session.save();
      console.log('Updated session?', req.session);
      res.send(user);
    } else {
      res.send('Incorrect password!');
    }
  })
};





router.route('/')
  .post(userLogin)

module.exports = router