var router = require('express').Router();
var User = require('../models/user');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
// CREATE a session
router.post('/', (req, res) =>{
   User.findOne({
     username: req.body.user.username,
   })
   .then(
      //user exists
      user => {
          User.authenticate(req.user.body.password, (isMatch) => {
            if(isMatch){
              var token = jwt.sign(userData._id, process.env.JWT_SECRET, {expiresIn: 60*60*24});
              res.json({
                authToken: token,
                user: userData
              });
            }
            else {
              res.status(401).json({
                message: 'We were unable to log you in with those credentials',
              });
            }
          });
      },
      //user !exists
      () => {
        res.status(401).json({
          message: 'We were unable to log you in with those credentials',
        });
      }
   );
  var userPass = req.body.user.password;

  bcrypt.compareSync(userPass, userHash, userCheck(err,res));
});
module.exports  = router;
