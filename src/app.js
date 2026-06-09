const express = require('express');
const authRoute = require('./modules/auth/auth.routes');
const errorHandler = require('./middlewares/error.middleware');
const authHandler = require('./middlewares/auth.middleware');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(authHandler);

// Routes
app.use('/api/auth', authRoute);

// Error Handler
app.use(errorHandler);



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});