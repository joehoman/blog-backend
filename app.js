const express = require('express');
const app = express();
const morgan = require('morgan');

const cors = require('cors');
app.use(cors());
app.use(express.json());

const dbConnection = require('./controllers/dbConnection');

// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();



  });

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
module.exports = app;

