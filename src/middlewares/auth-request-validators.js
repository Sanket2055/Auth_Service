const validateUserAuth = (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are required!",
            data: {},
            success: false,
            error: {}
        })
    }
    next();
}

const validateIsAdminRequest = async (req, res, next) => {
    if (!req.body.id) {
        return res.status(400).json({
            message: "userId is required!",
            data: {},
            success: false,
            error: {}
        })
    }
    next();
}

module.exports = {
    validateUserAuth,
    validateIsAdminRequest
}
