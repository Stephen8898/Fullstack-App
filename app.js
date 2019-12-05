const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/database');

//connecting our mongodb database
mongoose.connect(config.database, {useNewUrlParser: true,  useUnifiedTopology: true});

//on connection to indicate if database connection is on
mongoose.connection.on('connected', ()=> {
    console.log(`connected to database ${config.database}`)
});

const users = require('./routes/api/users');
const news = require('./routes/api/newsApi');

const app = express();

const port  = 3000;

//This is for cross site origin and makes our  routes public
//Cors Middleware
app.use(cors());

// Body parser middleware -- does some magic to handle json parsing of the req.body
app.use(bodyParser.json());

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//passing in the require to passport
require('./config/passport')(passport);

//Sattic folders from client side application
app.use(express.static(path.join(__dirname, 'client')));


//users route
app.use('/api/users', users);


app.use('/api', news);

// Index routes
app.get('/', (req, res) =>{
    res.send('Home');
});


app.listen(port, ()=> {
    console.log(`Listening on port ${port}`);
});