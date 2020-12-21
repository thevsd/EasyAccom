const mongoose = require('mongoose');

const db = process.env.MONGO_URI;

mongoose
	.connect(db, {
		useCreateIndex: true,
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	})
	.then(() => console.log('MongoDB connected'))
	.catch((err) => console.log(err));

mongoose.Promise = global.Promise;

module.exports = {
	User: require('../models/User'),
    Favorite: require('../models/Favorite'),
    Notice: require('../models/Notice'),
    Post: require('../models/Post'),
    Report: require('../models/Report'),
    Chat: require('../models/Chat'),
};
