const { StatusCodes } = require('http-status-codes');
class AppError extends Error {
    constructor(
        name = "AppError",
        message = "Something went wrong!",
        description = "Please try again later",
        statusCode = StatusCodes.INTERNAL_SERVER_ERROR) {
        super();
        this.message = message;
        this.description = description;
        this.statusCode = statusCode;
        this.name = name;
    }
}

module.exports = AppError;