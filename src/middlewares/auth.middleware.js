const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {

    if (req.path === "/api/auth/register" || req.path === "/api/auth/login") {
        return next(); // Skip auth for these routes
    }


    try {
        const { token } = req.cookies;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized access'
            });
        }

        const decodedUser = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decodedUser;

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Invalid or expired token'
        });
    }
}

module.exports = authenticate;