const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
	user_id: {
		type: String,
		required: true,
	},
	status: {
		type: String,
		required: true,
    },
    address: {
		type: String,
		required: true,
    },
    type: {
		type: String,
		required: true,
    },
    price: {
		type: String,
		required: true,
    },
    area: {
		type: String,
		required: true,
    },
    description: {
		type: String,
		required: true,
    },
    picture: {
		type: String,
		required: true,
    },
    contact: {
		type: String,
		required: true,
    },
    views: {
		type: String,
		required: true,
    },
    likes: {
		type: String,
		required: true,
    },
	date: { 
        type: Date, 
        required: true 
    },
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
