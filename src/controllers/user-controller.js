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
const signIn = async (req, res) => {
    try {
        const response = await userService.signIn(req.body.email, req.body.password);
        return res.status(200).json({
            message: "User logged in successfully!",
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

const isAuthenticated = async (req, res) => {
    try {
        const token = req.headers["x-access-token"];
        const response = await userService.isAuthenticated(token);
        return res.status(200).json({
            message: "User authenticated successfully!",
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
    create,
    signIn,
    isAuthenticated
}