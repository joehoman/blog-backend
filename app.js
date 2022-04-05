require("dotenv").config()
const express = require('express');
const app = express();
const morgan = require('morgan');
const knex = require("knex");
const bcrypt = require ('bcryptjs');
const cors = require('cors');
const dbConnection = require('./db/dbConnection')
const session = require("express-session")
const generateToken = require('./util/generateToken')

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
//getting all posts
  app.get('/posts', function(req, res){
      dbConnection
      .select('*')
      .from('posts')
      .then(data => res.status(200).json(data))
      .catch(err =>
        res.status(404).json({
            message:
              'The data you are looking for could not be found. Please try again'
        }))
  });

  //getting all posts by a specific user
  app.get('/posts/user/:user', function(req, res){
    dbConnection
    .select('*')
    .where({created_by: req.params.user})
    .from('posts')
    .then(data => res.status(200).json(data))
    .catch(err =>
      res.status(404).json({
          message:
            'The data you are looking for could not be found. Please try again'
      }))
});


//creating new post
  app.post('/posts', function(req, res){
    dbConnection
    .insert({ title: req.body.title, content: req.body.content, created_by: req.body.created_by }).from('posts')
        .then((data) => res.status(201).json(data))
        .catch((err) => {
          res.status(404).json({ message: "Something is wrong."})
      })
    });


//deleting a post
app.delete('/posts/', function(req, res){
  dbConnection
  .delete('*').where({title: req.body.title, created_by:req.body.user}).from('posts')
      .then((data) => res.status(201).json(data))
      .catch((err) => {
        res.status(404).json({ message: "Something is wrong."})
    })
  });


//getting a specific post
app.get('/posts/specific/:title', function(req, res){
  dbConnection
  .select('*')
  .where({title: req.params.title})
  .from('posts')
  .then((data) => res.status(201).json(data))
  .catch((err) => {
        res.status(404).json({ message: "Something is wrong."})
    })
  });


  //editing a post
  app.patch('/posts/edit', function(req, res){
    dbConnection
    .update({content: req.body.content})
    .where({title: req.body.title, created_by:req.body.user})
    .from('posts')
    .then((data) => res.status(201).json(data))
    .catch((err) => {
          res.status(404).json({ message: "Something is wrong."})
      })
    });


//creating an account
app.post('/register', async (req, res) => {
    try{
      const {username, password, first_name, last_name} = req.body;
      const user = req.body;
      const hash = await bcrypt.hash(password, 12);
      await dbConnection.insert({username: username, password_hash: hash, first_name: first_name, last_name: last_name}).from('users');
      res.status(201).json({
        user: username,
        token:generateToken(username)
       });
    } catch(e) {
      res.status(500).send('Something Went Wrong');
    }
  });

  module.exports = app


  //logging into an account
  app.post('/login', async(req, res) => {

    try{
      const {username, password} = req.body;
      user = await dbConnection.select('*').where({username: username}).from('users')
      if (user.length){
        const validPass = await bcrypt.compare(password, user[0].password_hash);
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
      res.status(500).send('Something Went Wrong');
      }
    });


  module.exports = app


