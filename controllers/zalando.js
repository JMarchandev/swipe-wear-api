const data = require('../data.json')

const getProducts = () => {
    const { products } = data;
    return products
}

module.exports = {
    getProducts
}