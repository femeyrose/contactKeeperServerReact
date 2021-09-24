   
const express = require('express');


const app = express();


const contacts = require("./contacts");
const users = require("./users");
const auth = require("./auth");


// app.get('/',(req,res)=> res.send("hello world"))

app.get('/',(req,res)=> res.json({msg:'welcome to the contactkeeper api...'}));

// Define Routes
app.post('/api/users', users.postreg);
app.get('/api/auth',auth.getauth);
app.post('/api/auth',auth.postauth);
app.get('/api/contacts', contacts.findAll);
app.post('/api/contacts', contacts.pos);
app.put('/api/contacts', contacts.pt);
app.delete('/api/contacts', contacts.del);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

