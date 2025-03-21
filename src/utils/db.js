import mysql from 'mysql2/promise';

// Create a conecction with the Database.
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

export default db;