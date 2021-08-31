const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firebase_uid: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: false
    },
    liked_products: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Product',
        required: true,
        default: [],
    },
    disliked_products: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Product',
        required: true,
        default: [],
    },
    creationDate: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    updatedDate: {
        type: Date,
        required: false,
    },
    deletdDate: {
        type: Date,
        required: false,
    }
})

module.exports = mongoose.model('User', userSchema);