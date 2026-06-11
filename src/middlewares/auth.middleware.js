const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {

    // Skip auth for auth routes and socket.io
    if (req.path === "/api/auth/register" || req.path === "/api/auth/login" || req.path.startsWith('/socket.io')) {
        return next();
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