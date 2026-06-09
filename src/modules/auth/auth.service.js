const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authModel = require('./auth.model');

async function register(data) {
    const { email, password, name } = data;

    const existingUser =
        await authModel.findUserByEmail(email);

    if (existingUser) {
        throw new Error('User already exists');
    }

    const hashedPassword =
        await bcrypt.hash(password, 10);

    const user =
        await authModel.createUser(
            name,
            email,
            hashedPassword
        );

    return user;
}

async function login(data) {
    const { email, password } = data;
    const user =
        await authModel.findUserByEmailWithPassword(email);

    if (!user) {
        throw new Error('Invalid credentials');
    }

    const isMatch =
        await bcrypt.compare(
            password,
            user.password
        );

    if (!isMatch) {
        throw new Error('Invalid credentials');
    }

    const token = jwt.sign(
        {
            userId: user.id,
            email: user.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '1d'
        }
    );

    return {
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        }
    };
}

module.exports = {
    register,
    login
};