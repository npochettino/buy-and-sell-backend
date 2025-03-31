import dotenv from 'dotenv';
dotenv.config();
import mysql from 'mysql2';

let connection;

export const db = {
    connect: () => {
        connection = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            socketPath: process.env.DB_SOCKET,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });
        console.log("MySQL Connected!");
    },
    query: (queryString, escapedValue) =>
        new Promise((resolve, reject) => {
            connection.execute(queryString, escapedValue, (error, results, fields) => {
                if (error) return reject(error);
                resolve({ results, fields });
            });
        }),
    end: () => connection.end(),
};
