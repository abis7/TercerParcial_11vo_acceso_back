import express from 'express';
import router from './router';
import cors from 'cors';

const server = express();

server.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cache-Control', 'Pragma'],
    credentials: true
}));
server.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store');
    next();
});
server.use(express.json());
server.use('/Api', router);

export default server;