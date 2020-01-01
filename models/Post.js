const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = Schema({

    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    profile: {
        type:  Schema.Types.ObjectId, ref: 'Profile',
        required: true
    },

    author: {
       type: String,
       required: true
    },

    title:{
        type: String, 
        required: true
    },

    body:{
        type: String,
        required: true
    },

    tags: {type: String,  required: true},

    date: {
        type: Date, default: Date.now()
    }

});

const Post = module.exports = mongoose.model('Post', PostSchema);


module.exports.getPostById = function(id, callback){
    Post.findById(id, callback);
}

module.exports.getPost = function(){
   return Post.find();
}

module.exports.getPostsByProfileId = function(id, callback){
    const query = {Profile: id};
    console.log(query);
   Post.find(query, callback);
}

module.exports.addPost = function(post, callback){
    post.save(callback);
}

module.exports.updatePost = function(id, post, callback){
    post.findByIdAndUpdate(id, post, callback);
}

module.exports.deletePost = function(id, callback){
    const query = {id: id}
    Post.deleteOne(query, callback)
}