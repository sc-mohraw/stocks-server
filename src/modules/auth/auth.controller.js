const authService = require('./auth.service.js');

const oneDay = 24 * 60 * 60 * 1000;
const cookieExpireTime = new Date(Date.now() + oneDay); // cookies in client side will expire in one day

async function register(req, res, next) {
    try {
        const user = await authService.register(req.body);

        res.status(201).json({
            success: true,
            data: user
        });
    } catch (error) {
        next(error);
    }
}

async function login(req, res, next) {
    try {
        const { token, user } = await authService.login(req.body);

        res.cookie("token", token, { expires: cookieExpireTime, httpOnly: true, }); // to set token in client side (in cookies)

        res.status(200).json({
            success: true,
            message: "Logged in successfully !",
            data: user
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    register,
    login
};