const express = require('express');

const authRoute = express.Router();

const authController =
    require('./auth.controller.js');

const validate =
    require('../../middlewares/validate.middleware.js');

const {
    registerSchema,
    loginSchema
} = require('./auth.validation.js');

authRoute.post(
    '/register',
    validate(registerSchema),
    authController.register
);

authRoute.post(
    '/login',
    validate(loginSchema),
    authController.login
);

// logout api
authRoute.post("/logout", (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
    });
    return res.status(200).json({ message: "Logged out successfully" });
});

module.exports = authRoute;