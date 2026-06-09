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

module.exports = authRoute;