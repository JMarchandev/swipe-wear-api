const express = require('express');
const router = express.Router();
const Product = require('../models/products');
const Faker = require('faker');
const { addProducts, getByListId, getProducts, getProductById, getRandomProducts } = require('../controllers/products');

// Get all
router.get('/', async (req, res) => {
    try {
        const products = await getProducts()
        res.json(products);
    } catch (error) {
        console.error('error on getProducts', error)
        res.status(500).json({ message: error.message });
    }
})

// Get one
router.get('/id/:productId', async (req, res, next) => {
    try {
        const product = await getProductById(req.params.productId)
        res.json(product)
    } catch (error) {
        console.error('error on getProductById', error)
        res.status(400).json(error);
    }
})

// Get list of products
router.post('/productsByListId', async (req, res, next) => {
    try {
        const product = await getByListId(req.body.listId)
        res.json(product)
    } catch (error) {
        console.error('error on getByListId', error)
        res.status(400).json(error);
    }
})

// Add one
router.post('/', async (req, res) => {
    let request = {
        title: req.body.title,
    }

    if (req.body.description !== null) {
        request.description = req.body.description
    }
    if (req.body.price !== null) {
        request.price = req.body.price
    }
    if (req.body.brand !== null) {
        request.brand = req.body.brand
    }
    if (req.body.img_url !== null) {
        request.img_url = req.body.img_url
    }
    if (req.body.redirection_url !== null) {
        request.redirection_url = req.body.redirection_url
    }

    try {
        const newProducts = await addProducts(request)
        res.send(newProducts)
    } catch (error) {
        console.error('error on addProducts', error)
        res.status(400).json({ message: error.message });
    }
})

// Update one
router.patch('/:id', getProduct, async (req, res) => {
    if (req.body.title !== null) {
        res.product.title = req.body.title
    }
    if (req.body.description !== null) {
        res.product.description = req.body.description
    }
    if (req.body.price !== null) {
        res.product.price = req.body.price
    }
    if (req.body.brand !== null) {
        res.product.brand = req.body.brand
    }
    if (req.body.img_url !== null) {
        res.product.img_url = req.body.img_url
    }
    if (req.body.redirection_url !== null) {
        request.redirection_url = req.body.redirection_url
    }

    res.product.updatedDate = Date.now()
    try {
        const updatedProduct = await res.product.save();
        res.json(updatedProduct);
    } catch (error) {
        console.error('error on updatedProduct', error)
        res.status(400).json({ message: error.message });
    }
})

// Delete one
router.delete('/:id', getProduct, async (req, res) => {
    try {
        await res.product.remove();
        res.json({ message: `product ${req.params.id} has been deleted` });
    } catch (error) {
        console.error('error on removeProduct', error)
        res.status(500).json({ message: error.message });
    }
})

async function getProduct(req, res, next) {
    let product;
    try {
        product = await Product.findById(req.params.id);
        if (product == null) {
            return res.status(404).json({ message: "Cannot find product" });
        }
    } catch (error) {
        console.error('error on getProduct ', error)
        return res.status(500).json({ message: error.message });
    }

    res.product = product;
    next();
}

module.exports = router;