const UserService = require('../services/user-service');
const userService = new UserService();

const create = async (req, res, next) => {
    try {
        const response = await userService.create({
            email: req.body.email,
            password: req.body.password
        });
        return res.status(201).json({
            message: "User created successfully!",
            data: response,
            success: true,
            error: {}
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something went wrong!",
            data: {},
            success: false,
            error: error.message
        })
    }
}

module.exports = {
    create
}