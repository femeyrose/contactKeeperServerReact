const express = require('express');
var router = express.Router();
const User=require('./config/User')
// const {check,validationResult}=require('express-validator/check');
const bcrypt =require('bcryptjs')
const jwt =require('jsonwebtoken')
const config =require('config')
// validator check
// npm install --save express-validator




// const routes = require('./routes')

// @route  POST api/users
// @desc  Register a user
// @access Public

// router.post('/', (req,res)=>{
//     res.send('Register a user');
// });

module.exports.postreg = async (req, res, next) => {

  
// const error=[check('name','name is required').not().isEmpty(),
// check('email','please include a valid email').isEmail(),
// check('password','password is required with 6 or more characters').isLength({min:6})];
   
// @route  POST api/users
// @desc  Register a user
// @access Public

// res.send('Register a user');

// res.send(req.body);
// const errors=validationResult(error);

if(!req.body.email || !req.body.name || !req.body.password){
  return res.status(400).send("field is missing")
}
// else if (!req.body.name){
  
//   return res.status(400).send("name is missing")
// }
// else if(!req.body.password){
//   return res.status(400).send("password is missing")
// }

// res.send('passed');
const { email,name, password} = req.body;
try{
  let user=await User.findOne({email});
  if(user){
    return res.status(400).json({msg:'User already exists'})
    // checking the existance of user
  }

  user =new User({
    name,email,password
  })

  // creating new user if the user doesnot exists

  const salt =await bcrypt.genSalt(10);
  user.password=await bcrypt.hash(password,salt);
  await user.save();

//  hashing the password using salt  and save the user

// res.send('user saved')
// now when run postman, and connect the mongodb to mongodb+srv://femey1234:femey1234@cluster0.mvzao.mongodb.net/test
// then the user that is written in body of postman is saved to db
// password will be encrypted one

const payload={
  user:{
    id:user.id
  }
}
// only user id is send, bcz will get all data related using this

jwt.sign(payload,config.get('jwtSecret'),{expiresIn:360000},(err,token)=>{
  if(err) throw err;
  res.json({token})
})
// taking from config->default.json->jwtSecret after importing it
// err and token are given as calllback
// when this is run in jwt.io, we get the user details such as user id
// next step to create middleware to extract the id created from the header for login
// registration is completed here, for login we have do the above step(extraction), go to auth.js file



}
// sending the req.body of postman 

    catch(err){
      console.log('err: ', err.message);
      res.status(500).send('server error')
      next(err);
    }
    
}


// module.exports = router;


// https://jwt.io/
// the jwt token has 3 parts- header,payload,signature
