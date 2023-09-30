const UserRepository = require('../repository/user-reposirtory');

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
}

module.exports = UserService;