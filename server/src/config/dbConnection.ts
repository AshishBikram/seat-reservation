import {createConnection, createPool} from "mysql2";
import * as dotenv from "dotenv";

dotenv.config();

// database connection details
const dbHost = process.env.DATABASE_HOST;
const dbName = process.env.DATABASE_NAME;
const dbPort = process.env.DATABASE_PORT;
const dbUser = process.env.DATABASE_USER;
const dbPassword = process.env.DATABASE_PASSWORD;
// Create a MySQL connection
export const connection = createPool({
    host: dbHost,
    port: Number(dbPort),
    user: dbUser,
    password: dbPassword,
    database: dbName
});
