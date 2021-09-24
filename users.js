const express = require('express');
var router = express.Router();
// const routes = require('./routes')

// @route  POST api/users
// @desc  Register a user
// @access Public

// router.post('/', (req,res)=>{
//     res.send('Register a user');
// });

module.exports.postreg = async (req, res, next) => {
    try{
   
// @route  POST api/users
// @desc  Register a user
// @access Public

res.send('Register a user');



    }catch(err){
      console.log('err: ', err);
      next(err);
    }
  };


// module.exports = router;
