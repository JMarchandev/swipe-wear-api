const { Mongoose } = require('mongoose');
const Product = require('../models/products');

const getProducts = async () => {
    try {
        const randomProducts = []
        const nbProducts = await Product.count()
        do {
            var random = Math.floor(Math.random() * nbProducts);
            const randomProduct = await Product.findOne().skip(random)
            randomProducts.push(randomProduct)
        } while (randomProducts.length <= 25);

        return (randomProducts);
    } catch (error) {
        console.log(error);
        return error
    }
}

const getRandomProducts = async () => {
    try {
        return Product.count().exec(async (err, count) => {
            // Get a random entry
            var random = Math.floor(Math.random() * count)
            const randomProducts = await Product.find().skip(random).limit(50)
            return randomProducts
        })
    } catch (error) {
        console.error('failed to getRandomProducts', error);
        return error
    }
}

const getProductById = async (productId) => {
    try {
        const product = await Product.findOne({ _id: productId })
        return product
    } catch (error) {
        console.error('failed to findOne', error);
        return error
    }
}

const getByListId = async (list) => {
    try {
        const products = await Product.find({
            '_id': { $in: list }
        })
        return products;
    } catch (error) {
        console.error('failed to getByListId', error);
        return error
    }
}

const addProducts = async (request) => {
    const product = new Product(request);
    try {
        const newProduct = await product.save()
        return newProduct
    } catch (error) {
        return error
    }
}

module.exports = {
    addProducts,
    getProducts,
    getRandomProducts,
    getProductById,
    getByListId,
}