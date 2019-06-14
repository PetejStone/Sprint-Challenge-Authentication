const axios = require('axios');
//const router = require('express').Router()
const bcrypt = require('bcryptjs'); // 
const jwt = require('jsonwebtoken');
const { authenticate } = require('../auth/authenticate');
const Users = require('./routes-model.js')

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};


function register(req, res) {
  let user = req.body // user is the content the user sends
  const hash = bcrypt.hashSync(user.password, 10) // hashes password sent 2 ^ 10th power times
  user.password = hash // password set = to this new hashed value

  Users.add(user) 
  .then(newUser => {
      res.status(201).json({newUser})// adds new user to db
  })
  .catch(err => {
      res.status(500).json({message: err})
  })
}

function login(req, res) {
  let {username, password} = req.body;
  Users.findBy({username})
  .first()
  .then(user => { //if the user and encrypted password exists
      if (user && bcrypt.compareSync(password, user.password)) {
          const token = generateToken(user) //calls generateToken fn  and passes user as argument (username and pass)
          res.status(200).json({
              message: `Welcome ${user.username}, you have successfully logged in`,
              department: user.department,
              username: user.username,
              token
          })
      } else {
          res.status(401).json({message: 'Invalid username or password'})
      }
  })
  .catch(err => {
      res.status(500).json({message: err})
  })
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}


