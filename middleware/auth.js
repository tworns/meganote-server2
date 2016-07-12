module.exports = (req,res,next) => {
  const token = req.headers.authorization;
  var jwt = require('jsonwebtoken')
  if( isPreflight(req) ||isLoggingInOrSigningUp(req)) {
    next();
    return;
  }
  if(token){
    //verify token, get user;
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedPayload) =>{
      if(decodedPayload){
        //get user
        res.json({decodedPayload});
      }
      else {
        res.status(401).json({message: 'Authentication required.'});
      }
    });
    next();
  }
  else{
    res.status(401).json({message: 'Authentication required.'});
  }
};
function isLoggingInOrSigningUp (req) {
  if(req.method.toLowerCase() !== 'post'){
      return false;
  }
  const loggingIn = req.originalUrl.includes('sessions');
  const signingUp = req.original.includes('users');
  return(loggingIn || signingUp);
}
function isPreflight (req){
  return (req.method.toLowerCase() === 'options');
}
