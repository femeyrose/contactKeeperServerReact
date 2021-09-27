const express = require('express')
const router = express.Router();
const User = require('./config/User')
// const { check, validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config');
const auth =require('./middleware/auth')

// @route  GET api/auth
// @desc  Get logged in user
// @access Private

// router.get('/', (req,res)=>{
//     res.send('get logged in user');
// });

// // @route  POST api/auth
// // @desc  Auth user and get token
// // @access Public

// router.post('/', (req,res)=>{
//     res.send('log in user');
// });

// getauth

module.exports.getauth = async (req, res, next) => {
 
      // @route  GET api/auth
      // @desc  Get logged in user
      // @access Private
      // res.send('get logged in user');
  try {
    const user=await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.error( err.message);
    res.status(500).send('server error');
  }
  

  

};


// postauth
// request send to check the registered user exists or not
module.exports.postauth = async (req, res, next) => {
  if (!req.body.email  || !req.body.password) {
    return res.status(400).send("field is missing")
  }

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'invalid credentials' })

    }

    const isMatch = await bcrypt.compare(password, user.password)
    // return true/false based on match the password
    if (!isMatch) {
      return res.status(400).json({ msg: 'invalid credentials' })
    }

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
    // @route  POST api/auth
    // @desc  Auth user and get token
    // @access Public
    
    // res.send('log in user');



  } catch (err) {
    console.log('err: ', err.message);
    res.status(500).send('server error')
    next(err);
  }
};


// module.exports =router;
