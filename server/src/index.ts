import express, {Response, Request, NextFunction} from 'express';
import cors from 'cors';
import { connection } from './config/dbConnection';
import appRoutes from "./routes";
import logger from "./config/logger";
import morgan from "morgan";
import http from "http";
import {initializeSocket} from "./config/socket";


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Request logging with Morgan
app.use(morgan("combined"));

app.use("/api", appRoutes)


// Error-handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error({
        message: err.message,
        stack: err.stack,
        method: req.method,
        url: req.url
    });
    res.status(500).json({ status: "Failed",error: err.message });
});



// Connect to the MySQL database
connection.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to the database: ' + err.stack);
        return;
    }
    console.log(`server running at http://localhost:${port}`);
});

app.listen(port, () => console.log(`server running at http://localhost:${port}`));


const server = http.createServer(app);
initializeSocket(server);
server.listen(5001, () => {
    console.log("Socket.IO Server running on http://localhost:5001");
});
