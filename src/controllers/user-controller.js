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
        res.status(error.statusCode).json({
            message: error.message,
            data: {},
            success: false,
            error: error.description
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
        res.status(error.statusCode).json({
            message: error.message,
            data: {},
            success: false,
            error: error.description
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

const isAdmin = async (req, res) => {
    try {
        const response = await userService.isAdmin(req.body.id);
        return res.status(200).json({
            message: "Successfully fetched whether user is admin or not",
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
    isAuthenticated,
    isAdmin
}