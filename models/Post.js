const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
	user_id: {
		type: String,
		required: true,
	},
	title: {
		type: String,
		required: true,
	},
	status: {
		type: Boolean,
		required: true,
    },
    address: {
		type: String,
		required: true,
	},
	proximity: {
		type: String,
		required: false,
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
    bath: {
		type: String,
		required: true,
	},
	kitchen: {
		type: String,
		required: true,
	},
	ac: {
		type: String,
		required: true,
	},
	balcony: {
		type: String,
		required: true,
	},
	elec_water: {
		type: String,
		required: true,
	},
	others: {
		type: String,
		required: false,
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
