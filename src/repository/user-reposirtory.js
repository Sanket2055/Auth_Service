const { User } = require('../models/index');

class userRepository {
    async create(data) {
        try {
            const user = await User.create(data);
            return user;
        } catch (error) {
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
}

module.exports = userRepository;