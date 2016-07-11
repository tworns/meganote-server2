var router = require('express').Router();
var User = require('../models/user');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
// CREATE a user
router.post('/', function(req, res) {
  var userPass = req.body.user.password;
  var userHash = User.findOne(req.body.user.username);
  bcrypt.compareSync(userPass, userHash, userCheck(err,res));
});
function userCheck (error, res){
  if(error){
    res.status(422).json({
      message: 'Incorrect username or password!'
    });
  }
  else{
    var token = jwt.sign(userData._id, process.env.JWT_SECRET, {expiresIn: 60*60*24});
    res.json({
      authToken: token,
      user: res,
    });
  }
}

module.exports  = router;
