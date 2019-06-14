const axios = require('axios');
//const router = require('express').Router()
const bcrypt = require('bcryptjs'); // 
const jwt = require('jsonwebtoken');
const { authenticate } = require('../auth/authenticate');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};
// router.post('/register', (req,res) => {
//   let user = req.body // user = to content user sends
//   const hash = bcrypt.hashSync(user.password, 10) // hashes password sent 2 ^ 10th power times
//   user.password = hash // password set = to this new hashed value

//   Users.add(user) 
//   .then(newUser => {
//       res.status(201).json({newUser})// adds new user to db
//   })
//   .catch(err => {
//       res.status(500).json({message: err})
//   })
// })

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
  // implement user login
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
