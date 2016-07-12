module.exports = (req,res,next) => {
  const token = req.headers.authorization;
  if( isPreflight(req) ||isLoggingInOrSigningUp(req)) {
    next();
    return;
  }
  if(token){
    //verify token, get user;
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
