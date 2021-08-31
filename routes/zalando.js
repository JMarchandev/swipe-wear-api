const express = require('express');
const { addProducts } = require('../controllers/products');
const { getProducts } = require('../controllers/zalando');
const router = express.Router();

router.get('/add-zalando-products', async (req, res) => {
    const products = getProducts()
    const newProducts = []

    const addNewProduct = async (product) => {
        try {
            const newProduct = await addProducts(product)
            return newProduct
        } catch (error) {
            return error
        }
    }

    products.map(async (response, i) => {
        const newProduct = await addNewProduct(response)
            .then(product => {
                console.log(product);
                newProducts.push(product)
            })
            .catch(console.log)
    })
    res.send(newProducts)
})

module.exports = router;

/**
 *
 * async (res) => {
        try {
            const newProduct = await addProducts(res)
            newProducts.push(newProduct)
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: error.message });
        }
    }
 */