const mongoose = require('mongoose');
const FavoriteSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
    },
    post_id: {
        type: String,
        required: true,
    },
    likes: {
        type: Number,
        required: true,
    },
});

const Favorite = mongoose.model('Favorite', FavoriteSchema);

module.exports = Favorite;