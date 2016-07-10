var router = require('express').Router();
var User = require('../models/user');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
// CREATE a user
router.post('/', function(req, res) {
if(!passwordsPresent(req.body.user) || !passwordMatch(req.body.user)){
  res.status(422).json({
    message: 'Passwords must match!'
  });
}
  var user = new User({
     username: req.body.user.username,
     name: req.body.user.name,
     passwordDigest: bcrypt.hashSync(req.body.user.password, 10),
   });
   user.save()
   .then((userData)=>{
     var token = jwt.sign(userData._id, process.env.JWT_SECRET, {expiresIn: 60*60*24});
     res.json({
       authToken: token,
       note: userData
     });
   });
});

module.exports  = router;
function passwordsPresent(payload){
  return (payload.password && payload.passwordConfirmation);
}
function passwordMatch (payload){
  return(payload.password === payload.passwordConfirmation);
}
