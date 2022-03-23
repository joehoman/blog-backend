require("dotenv").config()
const express = require('express');
const app = express();
const morgan = require('morgan');
const knex = require("knex");
const cookieParser = require('cookie-parser')
const bcrypt = require ('bcryptjs');
const cors = require('cors');
const dbConnection = knex(process.env.CONNECTION_STRING)
const session = require("express-session")
const generateToken = require('./util/generateToken')

// // Add headers before the routes are defined
// app.use(function (req, res, next) {

//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);

//     // Pass to next layer of middleware
//     next();
//   });

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(cookieParser());

//getting users or posts table
  app.get('/:table', function(req, res){
      dbConnection
      .select('*')
      .from(req.params.table)
      .then(data => res.status(200).json(data))
      .catch(err =>
        res.status(404).json({
            message:
              'The data you are looking for could not be found. Please try again'
        }))
  });


//creating new post
  app.post('/posts', function(req, res){
    console.log('postedasdfasdf', req.body.title)
    dbConnection
    .insert({ title: req.body.title, content: req.body.content}).from('posts')
        .then((data) => res.status(201).json(data))
        .catch((err) => {
          // console.error(err);
          res.status(404).json({ message: "Something is wrong."})
      })
    });


//creating an account
app.post("/users", async (req, res) => {
    try{
      const {username, password, first_name, last_name} = req.body;
      const user = req.body;
      const hash = await bcrypt.hash(password, 12);
      await dbConnection.insert({username: username, passwordHash: hash, first_name: first_name, last_name: last_name}).from('users');
      res.status(200).json('Account Created');
      req.session.user = user
    } catch(e) {
      console.log(e)
      res.status(500).send('Something Went Wrong');
    }
  });

  module.exports = app


  //logging into an account
  app.post("/login", async(req, res) => {

    try{
      const {username, password} = req.body;
      user = await dbConnection.select('*').where({username: username}).from('users')
      if (user.length){
        console.log(user)
        const validPass = await bcrypt.compare(password, user[0].passwordHash);
        if(validPass) {
          res.status(201).json({
            user: username,
            token:generateToken(username)
           });
        }
        else{
          res.json('Wrong Password')
        }
        }
        else {
          res.status(404).json('User not found')
        }
      }

      catch(e) {
      console.log(e)
      res.status(500).send('Something Went Wrong');
      }
    });


  module.exports = app


