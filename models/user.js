const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');
const Post = require('./Post');
const Schema = mongoose.Schema;
const ProfileSchema = require('./Profile');

//User Schema
const UserSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },

    username:{
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    }

});

delete mongoose.connection.models['User'];
const User = module.exports = mongoose.model('User', UserSchema);

//Get user by id
module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
}

//Get user by email
module.exports.getByUserEmail = function(email, callback){
    const query = {email: email}
    User.findOne(query, callback);
}

// Get user by username
module.exports.getByUserName = function(username, callback){
    const query = {username: username}
    User.findOne(query, callback);
}

module.exports.addUser = function(newUser, callback) {
   bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        })
   });
  
}
// User.findById().pop

module.exports.comparePassword = function(userPassword, hash, callback) {
    bcrypt.compare(userPassword, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    });
module.exports.userExist = function(newUser, callback){
    
}

module.exports.getPostByProfileAndUser = function(){

}

module.exports.submitPostByProfile = function(){

}
// module.exports.getUserPosts = function(query, callback){
//     const query = {user}
//     }
}
