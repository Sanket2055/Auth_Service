const UserRepository = require('../repository/user-reposirtory');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/serverConfig');
class UserService {
    constructor() {
        this.userRepository = new UserRepository();

    }

    async create(data) {
        try {
            const user = await this.userRepository.create(data);
            return user;

        } catch (error) {
            console.log("something went wrong: service Layer", error)
            throw error;
        }
    }

    createToken = (user) => {
        try {

            const token = jwt.sign(user, JWT_SECRET, { expiresIn: '1h' });
            return token;
        } catch (error) {
            console.log("something went wrong: service Layer", error)
            throw error;

        }
    }

    verifyToken = (token) => {
        try {
            const response = jwt.verify(token, JWT_SECRET);
            return response;
        } catch (error) {
            console.log("something went wrong: service Layer", error)
            throw error;

        }
    }
}

module.exports = UserService;