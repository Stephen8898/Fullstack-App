const express = require('express');
const route = express.Router();

const Post = require('../../models/Post');
const Profile =  require('../../models/Profile');


route.post('/post_new/:user_id/profile/:profile_id', (req, res) => {
    let post = new Post({
        user_id: req.params.user_id,
        profile: req.params.profile_id,
        author: req.body.author,
        title: req.body.title,
        body: req.body.body,
        tags: req.body.tags
    });
    // function to add a post
    Post.addPost(post, (err, post) => {
        if (err) {
            res.status(500).json({success: false, msg: 'Failed to create a post'})
        }else{
            res.status(200).json({success: true, msg: 'Post created'});
        }
    });

});

route.get('/get_post/:id', (req, res) => {
   
   Post.findById(req.params.id)
    .then(post => {
    res.status(200).json({post});
  }).catch(err => {
      console.log(err);
    res.status(404).json({err:err, msg: 'Post not found'});
  });
  
});


route.get('/get_post/all/:profile_id', (req, res) => {
    const query = {profile:req.params.profile_id};
    Post.find(query)
    .then(post =>{
        res.status(200).json({post});
    })
    .catch(err => {
        res.status(404).json({err:err, msg: 'No post for this profile'});
    });
});


route.put('/update/:post_id/', (req, res) => {
    let updatePost = req.body;
    Post.findByIdAndUpdate(req.params.post_id, updatePost)
    .then(data => {
        res.status(200).json({success: true, data: data});
    })
    .catch(err => {
        res.status(400).json({success: false, msg: err});
    })
});


route.delete('/delete/:post_id/', (req, res) => {

    Post.deleteOne(req.params.post_id)
    .then(data => {
        res.status(200).json({success: true, data: data});
    })
    .catch(err => {
        res.status(400).json({success: false, msg: err});
    })
});


route.get('/search/post', (req, res)=>{
    // const query = {title: }
});


module.exports = route;