const express = require('express');
const { getUserByFB_UID, getAllUsers, getUserById, createUser, updateUser, deleteUser, userLikeProduct, userDislikeProduct } = require('../controllers/users');
const router = express.Router();
const User = require('../models/users');

// Get all
router.get('/', async (req, res) => {
    try {
        const users = await getAllUsers();
        res.json(users);
    } catch (error) {
        console.error('error on getAllUsers', error);
        res.status(500).json({ message: error.message });
    }
})

// Get one
router.get('/:userId', async (req, res, next) => {
    try {
        const user = await getUserById(req.params.userId)
        res.json(user)
    } catch (error) {
        console.error('error on getUserById', error)
        res.status(400).json(error);
    }
})

// Get one by firebase_uid
router.get('/firebase/:uid', async (req, res) => {
    try {
        const user = await getUserByFB_UID(req.params.uid)
        res.json(user)
    } catch (error) {
        console.error('error on getUserByFB_UID', error)
        res.status(400).json(error);
    }
})

// Add one
router.post('/', async (req, res) => {
    try {
        const user = await createUser(req.body)
        res.json(user)
    } catch (error) {
        console.error('error on createUser', error);
        res.status(400).json(error);
    }
})

// Update one
router.patch('/:userId', async (req, res) => {
    try {
        const updatedUser = await updateUser(req.params.userId, req.body)
        res.json(updatedUser);
    } catch (error) {
        console.error('error on updateUser', error);
        res.status(400).json({ message: error.message });
    }
})

// User like product
router.post('/:userId/like', async (req, res) => {
    try {
        const user = await userLikeProduct(req.params.userId, req.body.productId)
        res.json(user)
    } catch (error) {
        console.error('error on userLikeProduct', error);
        res.status(400).json({ message: error.message });
    }
})

// User dislike product
router.post('/:userId/dislike', async (req, res) => {
    try {
        const user = await userDislikeProduct(req.params.userId, req.body.productId)
        res.json(user)
    } catch (error) {
        console.error('error on userDislikeProduct', error);
        res.status(400).json({ message: error.message });
    }
})


// Delete one
router.delete('/:userId', async (req, res) => {
    try {
        await deleteUser(req.params.userId)
        res.json({ message: `user ${req.params.userId} has been deleted` });
    } catch (error) {
        console.log('error on deleteUser', error);
        res.status(500).json({ message: error.message });
    }
})


module.exports = router;
