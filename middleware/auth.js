// function that access to response and req cycle--middleware

const jwt =require('jsonwebtoken');
const config=require('config');

module.exports=function(req,res,next){
    // get token from header
    const token=req.header('x-auth-token');

    // check if not token
    if(!token){
        return res.status(401).json({msg:'no token,authorization denied'})
    }
    // if there is token go for try catch
    try {
       const decoded =jwt.verify(token,config.get('jwtSecret')) 
       req.user=decoded.user;
    //    decoded user is send
    next();
    } catch (err) {
        res.status(401).json({msg:'token invalid'})
    }
}