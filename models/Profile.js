const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const ProfileSchema = Schema({
    
    user_id: {
    type:  Schema.Types.ObjectId, ref: 'User',
    required: true,
    unique: true
    },

    profileImg:{ 
        type: String,
        default: ""
    },
    contact: {
        type: Schema.Types.Mixed,
        default: {}
        },
    about: {
        type: String,
        default: "About me"
    },

    following: [{type: Schema.Types.Mixed, ref: 'User'}],

    post: [{type: Schema.Types.Mixed, ref: 'Post'}]
});

const Profile = module.exports = mongoose.model('Profile', ProfileSchema);
