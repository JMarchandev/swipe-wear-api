const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
        default: null,
    },
    price: {
        type: String,
        required: false,
        default: 0
    },
    brand: {
        type: String,
        required: false,
        default: "unknown"
    },
    redirection_url: {
        type: String,
        required: false,
    },
    img_url: {
        type: String,
        required: false,
        default: "https://via.placeholder.com/250x400"
    },
    likes: {
        type: Number,
        required: true,
        default: 0
    },
    dislikes: {
        type: Number,
        required: true,
        default: 0
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

module.exports = mongoose.model('Product', productSchema);