const UserRepository = require('../repository/user-reposirtory');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/serverConfig');
const bcrypt = require('bcrypt');
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

    async signIn(email, plainPassword) {
        try {

            // fetch the user using email
            const user = await this.userRepository.getUserByEmail(email);
            // check if user exists
            if (!user) {
                console.log('User not found');
                throw new Error('User not found');
            }
            // check if password is correct
            const isPasswordCorrect = this.checkPassword(plainPassword, user.password);
            if (!isPasswordCorrect) {
                console.log('Password is incorrect');
                throw new Error('Password is incorrect');
            }
            // create token
            const token = this.createToken({ email: user.email, id: user.id });
            // return token
            return token;


        } catch (error) {
            console.log("something went wrong: service Layer", error)
            throw error;
        }
    }

    async isAuthenticated(token) {
        try {
            const isTokenVerified = await this.verifyToken(token);
            if (!isTokenVerified) {
                throw new Error('Token is invalid');
            }
            const user = await this.userRepository.getById(isTokenVerified.id);
            if (!user) {
                throw new Error('User not found');
            }

            return user.id;
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

    checkPassword = (password, hash) => {
        try {
            const response = bcrypt.compareSync(password, hash);
            return response;
        } catch (error) {
            console.log("something went wrong: service Layer", error)
            throw error;
        }
    }


}

module.exports = UserService;