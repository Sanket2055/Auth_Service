const ValidationError = require("../utils/validation-error")
const ClientError = require("../utils/client-error")
const { StatusCodes } = require('http-status-codes');
const { User, Role } = require('../models/index');

class userRepository {
    async create(data) {
        try {
            const user = await User.create(data);
            return user;
        } catch (error) {

            if (error.name === 'SequelizeValidationError') {
                let validationError = new ValidationError(error);
                throw validationError;
            }
            console.log("something went wrong: repository Layer", error)
            throw error;
        }
    }


    async destroy(id) {
        try {
            await User.destroy({ where: { id } });
        } catch (error) {
            console.log("something went wrong: repository Layer", error)
            throw error;
        }
    }

    async getById(userId) {
        try {
            const user = await User.findByPk(userId, {
                attributes: ['email', 'id']
            });
            return user;
        } catch (error) {
            console.log("something went wrong: repository Layer", error)
            throw error;
        }
    }

    async getUserByEmail(email) {
        try {
            const user = await User.findOne({ where: { email } });
            if (!user) {
                throw new ClientError(
                    "AttributeNotFound",
                    "Invalid Email ",
                    "No user found with this email",
                    StatusCodes.NOT_FOUND
                )
            }
            return user;
        } catch (error) {
            console.log(error, "in get by email");
            console.log("something went wrong: repository Layer", error)
            throw error;
        }
    }

    async isAdmin(userId) {
        try {
            console.log('userId', userId);
            const user = await User.findByPk(userId);
            if (!user) {
                throw new Error('User not found');
            }
            const adminRole = await Role.findOne({ where: { name: 'ADMIN' } });
            return user.hasRole(adminRole);
        } catch (error) {
            console.log("something went wrong: repository Layer", error)
            throw error;
        }
    }
}

module.exports = userRepository;