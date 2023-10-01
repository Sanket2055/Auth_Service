const AppError = require('./error-handler');
const { StatusCodes } = require('http-status-codes');
class ValidationError extends AppError {
    constructor(error) {
        let explanation = [];

        let errorName = error.name;
        error.errors.forEach((err) => {
            explanation.push(err.message);
        });
        super(
            errorName,
            "Not Able to validate the request",
            explanation,
            StatusCodes.BAD_REQUEST,
        )
    }
}

module.exports = ValidationError;