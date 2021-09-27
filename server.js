   
const express = require('express');
const connectDB =require('./config/db')

const app = express();
const Auth =require('./middleware/auth')

//connect db
connectDB();

// init Middleware
app.use(express.json({extended:false}))
// now using this we can accept data (in req.body)

const contacts = require("./contacts");
const users = require("./users");
const auth = require("./auth");


// app.get('/',(req,res)=> res.send("hello world"))

app.get('/',(req,res)=> res.json({msg:'welcome to the contactkeeper api...'}));

// Define Routes
app.post('/api/users', users.postreg);
app.get('/api/auth',Auth,auth.getauth);
// Auth is passes as middleware to check the token
// in the header
// since this is private path, we add Auth middleware here

app.post('/api/auth',auth.postauth);
app.get('/api/contacts',Auth, contacts.findAll);
app.post('/api/contacts',Auth, contacts.pos);
app.put('/api/contacts/:id',Auth, contacts.pt);
app.delete('/api/contacts/:id',Auth, contacts.del);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


// working of create contact
// under a particular register there will be a contact, we use this registered person's token for creating their contacts
// register a user click send,take his token obtained, copy this token for get req of contact click send
// empty contact for this registered user, do copy the same token in post req of contact and click send
// check this user by clicking get req of contact, we get the contact just created (post req of contact) under this get req of contact of the registered user



// res---response to postman--sending
// req--req to postman---to get data from postman


// working of update contact
// only the contact under particular registered user can update the contact
// take the id from get contact,copy to update contact's url in postman
// add content-type,x-auth-token in header
// add body json eg:phone number which field we want to change
// run the update,will update data of that reg user's contact, if we copy the token of other reg user, this will be un authorized
