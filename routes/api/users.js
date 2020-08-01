const express = require('express');
const route = express.Router();
const passport = require('passport');
const jwt  = require('jsonwebtoken');
const config = require('../../config/database');
const fileUpload = require('../../config/filestorage');

const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

//register
route.post('/register', (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
    });

    //add user function
    User.addUser(newUser, (err, user) => {
        if(err){
            res.status(400).json({success: false, msg: 'Failed to register user'})
        } else{

        let profile = new Profile({
            user_id: newUser._id,
            contact: {email: {type: 'Email', value: newUser.email}}
        });
            profile.save();
            res.status(200).json({success: true, msg: 'User successfully Signed up'})
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
           res.status(404).json({success: false, msg: 'User does not exist'});
       }

        //compares the password
       User.comparePassword(password, user.password, (err, isMatch) =>{
            if (err) throw err;
            if(isMatch){
                const token = jwt.sign(user.toJSON(), config.secret, {
                    expiresIn: 5000
                });
    
                return res.json({
                    success: true,
                    token: 'JWT' + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email,
                    }
                });
            } else {
                return res.json({success: false, msg: 'Wrong password'})
            }
       });

    
   });
});

//Profile
route.get('/profile', passport.authenticate('jwt', {session: false}),(req, res, next) => {  
    Profile.findOne({user_id:req.user._id}, (err, profile)=>{
        if (err) throw err;
        else {
            Post.find({profile: profile._id}).select('_id')
            .then(data => {
                profile.post = data.map((post) => {
                    if (profile.post.indexOf(post._id) === -1){
                        profile.post.push(post._id);
                        profile.save()
                        .then(data => console.log(data))
                        .catch(err => next(err))
                    } 
                        return post._id
                });

                res.status(200).json({profile});
            })
            .catch(err => console.log(err))
        }
    });
    
});

route.put('/profile/update/:profile_id', (req, res) => {

    let update = {
        contact: req.body.contact,
        about: req.body.about
    };

    Profile.findByIdAndUpdate(req.params.profile_id, update)
    .then(data => {
        res.status(200).json({success: true, data: data});
    })
    .catch(err => {
        res.status(400).json({success: false, msg: err});
    });
    
});

route.put('/profile/upload/:profile_id', fileUpload.single('profileImg'),(req, res) => {
    try{
        let update = {profileImg : req.file.path};


        Profile.findByIdAndUpdate(req.params.profile_id, update)
        .then(data => {
            res.status(200).json({success: true, data: data.profileImg});
        })
        .catch(err => {
            res.status(400).json({success: false, msg: err});
        })
    }
    catch(err){
        res.json({msg:err})
    }
});

// route.post('/profile/:profile_id/follow/:user_id', (req, res)=> {
//     Profile.findOne({_id:req.params.profile_id}, (err, profile)=>{
//         if (err) throw err;
//         else {
//             Profile.find({user_id: req.params.user_id}).select('user_id')
//             .then(data => {
//                 profile.following = follow
//             })
//             .catch(err => {

//             })
//         }
//     });
// });

//Validate
route.get('/validate', (req, res, next) => {
    res.send('validate')
})

module.exports = route;