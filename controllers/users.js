const User = require('../models/users')

const getAllUsers = async () => {
    try {
        const users = await User.find()
        return users
    } catch (error) {
        console.error('failed to find', error);
        return error
    }
}

const getUserById = async (userId) => {
    try {
        const user = await User.findOne({ _id: userId })
        return user
    } catch (error) {
        console.error('failed to findOne', error);
        return error
    }
}

const getUserByFB_UID = async (fb_uid) => {
    try {
        const user = await User.findOne({ firebase_uid: fb_uid })
        return user
    } catch (error) {
        console.error('failed to findOne', error);
        return error
    }
}

const createUser = async (user) => {
    let request = {
        firebase_uid: user.firebase_uid,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
    }

    if (user.phone !== null) {
        request.phone = user.phone
    }

    const newUser = await new User(request);
    try {
        const userCreated = await newUser.save()
        return userCreated;
    } catch (error) {
        console.error('failed to save', error);
        return error
    }
}

const updateUser = async (userId, userRequest) => {
    try {
        const user = await getUserById(userId)
        if (userRequest.firstName) {
            user.firstName = userRequest.firstName
        }
        if (userRequest.lastName) {
            user.lastName = userRequest.lastName
        }
        if (userRequest.email) {
            user.email = userRequest.email
        }
        if (userRequest.phone) {
            user.phone = userRequest.phone
        }
        user.updatedDate = Date.now()

        const updatedUser = await user.save();
        return updatedUser;
    } catch (error) {
        console.error('failed to save', error);
        return error
    }
}

const deleteUser = async (userId) => {
    try {
        const user = await getUserById(userId)
        await user.remove()
    } catch (error) {
        console.error('failed to remove', error);
        return error
    }
}

const userLikeProduct = async (userId, productId) => {
    try {
        const user = await getUserById(userId);
        console.log(user);
        const likedProduct = []
        if (!user.liked_products.includes[userId]) {
            likedProduct.push(...user.liked_products, productId)
        }
        user.liked_products = likedProduct
        
        const updatedUser = await user.save();
        return updatedUser;
    } catch (error) {
        console.error('failed to update', error);
        return error
    }
}

const userDislikeProduct = async (userId, productId) => {
    try {
        const user = await getUserById(userId);
        const dislikedProduct = [...user.disliked_products, productId]
        user.disliked_products = dislikedProduct
        
        const updatedUser = await user.save();
        return updatedUser;
    } catch (error) {
        console.error('failed to update', error);
        return error
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    getUserByFB_UID,
    createUser,
    updateUser,
    deleteUser,
    userLikeProduct,
    userDislikeProduct,
}