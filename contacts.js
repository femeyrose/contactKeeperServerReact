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
const Contact=require('./Contact');
const User=require('./config/User');
const auth=require('./middleware/auth')

module.exports.findAll = async (req, res, next) => {
 
   
// @route  GET api/contacts
// @desc  get all user contacts
// @access Private
// note:we add the auth to private paths

    // res.send('Get all contacts');
try {
  const contacts=await Contact.find({user:req.user.id}).sort({date:-1})
  res.json(contacts)
} catch (err) {
  console.error(err.message);
  res.status(500).send('server error')
  // at first time run we get [] empty array since we dont have any contacts

}


    
  };

//   post

module.exports.pos = async (req, res, next) => {
    

// // @route  POST api/contacts
// // @desc  add new contact
// // @access Private
// // res.send('add contact');
//     if (!req.body.name ) {
//       return res.status(400).send("field is missing")
//     }
const {name, email, phone, type} = req.body;

    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id,
      });

      const contact = await newContact.save();
      // to save to DB

      res.json(contact);
      // give the json contact
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }

  };

//   put

module.exports.pt = async (req, res, next) => {
  

// @route  PUT api/contacts/:id
// @desc  update contact
// @access Private

    // res.send('edit contact');
    const {name, email, phone, type} = req.body;

    // build contact object
    const contactFields = {};
    if (name) contactFields.name = name;
    if (email) contactFields.email = email;
    if (phone) contactFields.phone = phone;
    if (type) contactFields.type = type;

    try{
      let contact = await Contact.findById(req.params.id);

      if (!contact) return res.status(404).json({msg: 'Contact not found'});
// find contact using id

//  make sure user owns contact

if (contact.user.toString() !== req.user.id) {
  return res.status(401).json({msg: 'Not authorized'});
}
 // compare with the user from token 
  // convert to string
  contact = await Contact.findByIdAndUpdate(
    req.params.id,
    {$set: contactFields},
    {new: true},
  );

  res.json(contact);

  // this is the find by id and update real put function
  // set the contact fields

  // send the updated contact
}
    catch(err){
      console.log('err: ', err);
      res.status(500).send('Server Error');
    }
  };

  module.exports.del = async (req, res, next) => {
 

// @route  DELETE api/contacts/:id
// @desc  DELETE contact
// @access Private
    res.send('delete contact');
    try {
      let contact = await Contact.findById(req.params.id);
  
      if (!contact) return res.status(404).json({msg: 'Contact not found'});
  
      // Make sure user owns contact
      if (contact.user.toString() !== req.user.id) {
        return res.status(401).json({msg: 'Not authorized'});
      }
  
      await Contact.findByIdAndRemove(req.params.id);
      // find the contact by id from params and remove the contact
      

      res.json({msg: 'Contact removed'});
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };