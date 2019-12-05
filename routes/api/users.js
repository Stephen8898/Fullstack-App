const express = require('express');
const route = express.Router();
const passport = require('passport');
const jwt  = require('jsonwebtoken');
const config = require('../../config/database')

const User = require('../../models/user')

//register
route.post('/register', (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });
    //add user function
    User.addUser(newUser, (err, user) => {
        if(err){
            res.json({success: false, msg: 'Failed to register user'})
        } else{
            res.json({success: true, msg: 'User successfully Signed up'})
        }
    });

});

//Authenticate
route.post('/authenticate', (req, res, next) => {
   const email = req.body.email;
   const password = req.body.password;

   User.getByUserEmail(email, (err, user) => {
       if (err) throw err;
       if(!user){
           res.json({success: false, msg: 'User does not exist'});
       }

        //compares the password
       User.comparePassword(password, user.password, (err, isMatch) =>{
            if (err) throw err;
            if(isMatch){
                const token = jwt.sign(user.toJSON(), config.secret, {
                    expiresIn: 3000 //  seconds
                });
                return res.json({
                    success: true,
                    token: 'JWT' + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                });
            } else {
                return res.json({success: false, msg: 'Wrong password'})
            }
       })
   })
});

//Profile
route.get('/profile', passport.authenticate('jwt', {session: false}),(req, res, next) => {
    res.json({user: req.user})
});

//Validate
route.get('/validate', (req, res, next) => {
    res.send('validate')
})

module.exports = route;