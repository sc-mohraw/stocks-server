const express = require('express');
const cors = require("cors");
const http = require('http');
const { Server } = require('socket.io');
const authRoute = require('./modules/auth/auth.routes');
const errorHandler = require('./middlewares/error.middleware');
const authHandler = require('./middlewares/auth.middleware');
const cookieParser = require('cookie-parser');
const stocksRoute = require('./modules/stocks/stocks.routes');
const app = express();
const PORT = 3000;
const server = http.createServer(app);


// Middleware
app.use(
    cors({
        origin: "http://localhost:4200",
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    })
);
app.use(express.json());
app.use(cookieParser());
app.use(authHandler);

// Routes
app.use('/api/auth', authRoute);
app.use('/api/stocks', stocksRoute);

// Error Handler
app.use(errorHandler);


// socket

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:4200',
        methods: ['GET', 'POST']
    }
});

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

app.set('io', io);

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});