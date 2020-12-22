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
	rented: {
		type: Boolean,
		required: true,
    },
    price: {
		type: Number,
		required: true,
    },
    area: {
		type: Number,
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
		type: Number,
		required: true,
    },
    likes: {
		type: Number,
		required: true,
    },
	date: { 
        type: Date, 
        required: true,
	},
	extend_date: {
		type: Date,
		required: true,
	},
	pay_to_extend: {
		type: Number,
		required: true,
	},
	backup_extend : {
		type: Date,
		required: false,
	}
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
