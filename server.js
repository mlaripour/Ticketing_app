const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
//const path = require('path');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('./models/User');
const withAuth = require('./middleware');
//const { time } = require('console');

const app = express();

//be in .env file for production
const secret = 'mysecretsshhh';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

const mongo_uri = 'mongodb://localhost/ticketing-system';
mongoose.connect(mongo_uri, { useNewUrlParser: true }, function(err) {
  if (err) {
    throw err;
  } else {
    console.log(`Successfully connected to ${mongo_uri}`);
  }
});

//app.use(express.static(path.join(__dirname, 'public')));


//app.get('/', function (req, res) {
//  res.sendFile(path.join(__dirname, 'public', 'index.html'));
//});

app.get('/api/home', function(req, res) {
  res.status(200).send('Welcome!');
});

app.post('/api/register', function(req, res) {
  const { email, password } = req.body;
  console.log(email+password);
  const user = new User({ email:email, password:password });
  user.save(function(err) {
    if (err) {
      console.log(err);
      res.status(500).send("Error registering new user");
    } else {
      res.status(200).send("Welcome to ticketing system");
    }
  });
});

 //sign in
app.post('/api/authenticate', function(req, res) {
  const { email, password } = req.body;
  User.findOne({ email }, function(err, user) {
    if (err) {
      console.error(err);
      res.status(500)
        .json({
        error: 'Internal error'
      });
    } else if (!user) {
      res.status(401)
        .json({
        error: 'Incorrect email or password'
      });
    } else {
      user.isCorrectPassword(password, function(err, same) {
        if (err) {
          res.status(500)
            .json({
            error: 'Internal error'
          });
        } else if (!same) {
          res.status(401)
            .json({
            error: 'Incorrect email or password'
          });
        } else {
          //token
          const payload = { email };
          const token = jwt.sign(payload, secret, {
            expiresIn: '1h'
          });
          res.cookie('token', token, { httpOnly: true }).sendStatus(200);
        }
      });
    }
  });
});

//protected view
app.get('/api/mytickets', withAuth, function(req, res) {
  email = req.email
  User.findOne({ email }, function(err, user) {
    if (err) {
      console.error(err);
      res.status(500)
        .json({
        error: 'Internal error'
      });
    } else {
    res.status(200).json({ tickets : user.tickets });
    }  
  });
});

app.get('/api/assign', withAuth, function(req, res) {
  email = req.email
  User.find({},function(err, users) {
    if (err) {
      console.error(err);
      res.status(500)
        .json({
        error: 'Internal error'
      });
    } else {
    users = users.map((user)=>{return ({value:user.email,label:user.email})});  
    res.status(200).json({ users : users});
    }  
  });
});

app.post('/api/assign', withAuth, function(req, res) {
  name = req.email
  const { ticketname, selected } = req.body;
  selected.forEach(email => {
    User.findOne({email},function(err, user){
      if (err) {
        console.error(err);
        res.status(500)
          .json({
          error: 'Internal error'
        });
      } else {
        user.tickets.push({name:ticketname,
          created_by:name,
          date:new Date().toLocaleString()});
        user.save();
      }
    })
  });
  res.status(200).send('tickets sent');  

});

app.get('/checkToken', withAuth, function(req, res) {
  res.sendStatus(200);
});

app.listen(process.env.PORT || 8080);
