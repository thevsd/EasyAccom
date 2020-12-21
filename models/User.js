const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: false
    },
    card_id: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    update_permit: {
        type: Boolean,
        required: false
    },
    status: {
        type: Boolean,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    user_type: {
        type: String,
        required: true
    }
});

UserSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
        delete ret._id;
        delete ret.hash;
    }
})

const User = mongoose.model('User', UserSchema);

module.exports = User;