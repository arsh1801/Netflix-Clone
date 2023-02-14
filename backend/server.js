const express = require('express');
const path = require('path');
const app = express(), 
      bodyParser = require("body-parser");
port = 5000;
const bcrypt = require('bcrypt')

// place holder for the data
const users = [];

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../Frontend/public')));

app.get('/backend/users', (req, res) => {
  console.log('backend/users called!')
  res.json(users);
});

app.post('/backend/user', (req, res) => {
  const user = req.body.user;
  console.log('Adding user:::::', user);
  users.push(user);
  res.json("user added");
});

app.get('/signup', async (req, res) => {
  try {
    const hashedpassword = await bcrypt.hash(req.body.password, 10)
    users.push({
      id: Date.now().toString(),
        name: req.body.firstName,
        email: req.body.emailAddress,
        password: hashedpassword
    })
    res.redirect('/signin')
  } catch {
    res.redirect('/signup')
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../Frontend/src/pages/signin.js'));
});

// app.get('/', (req,res) => {
//   res.sendFile(path.join(__dirname, '../Frontend/public/index.html'));
// });

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});