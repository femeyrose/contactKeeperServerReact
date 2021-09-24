const express = require('express')
const router =express.Router();

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
    try{
   
// @route  GET api/auth
// @desc  Get logged in user
// @access Private
res.send('get logged in user');



    }catch(err){
      console.log('err: ', err);
      next(err);
    }
  };


// postauth
module.exports.postauth = async (req, res, next) => {
    try{
   
// @route  POST api/auth
// @desc  Auth user and get token
// @access Public
res.send('log in user');



    }catch(err){
      console.log('err: ', err);
      next(err);
    }
  };


// module.exports =router;
