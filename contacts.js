// const express = require('express')
// const router =express.Router();

// // @route  GET api/contacts
// // @desc  get all user contacts
// // @access Private

// router.get('/', (req,res)=>{
//     res.send('Get all contacts');
// });

// // @route  POST api/contacts
// // @desc  add new contact
// // @access Private

// router.post('/', (req,res)=>{
//     res.send('add contact');
// });

// // @route  PUT api/contacts/:id
// // @desc  update contact
// // @access Private

// router.put('/:id', (req,res)=>{
//     res.send('update contact');
// });

// // @route  DELETE api/contacts/:id
// // @desc  DELETE contact
// // @access Private

// router.delete('/:id', (req,res)=>{
//     res.send('update contact');
// });


// module.exports =router;

const express = require('express');
const app = express();


module.exports.findAll = async (req, res, next) => {
    try{
   
// @route  GET api/contacts
// @desc  get all user contacts
// @access Private


    res.send('Get all contacts');



    }catch(err){
      console.log('err: ', err);
      next(err);
    }
  };

//   post

module.exports.pos = async (req, res, next) => {
    try{

// @route  POST api/contacts
// @desc  add new contact
// @access Private
    res.send('add contact');

    }catch(err){
      console.log('err: ', err);
      next(err);
    }
  };

//   put

module.exports.pt = async (req, res, next) => {
    try{

// @route  PUT api/contacts/:id
// @desc  update contact
// @access Private

    res.send('edit contact');

    }catch(err){
      console.log('err: ', err);
      next(err);
    }
  };

  module.exports.del = async (req, res, next) => {
    try{

// @route  DELETE api/contacts/:id
// @desc  DELETE contact
// @access Private
    res.send('delete contact');

    }catch(err){
      console.log('err: ', err);
      next(err);
    }
  };