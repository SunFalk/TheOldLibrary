import mysql from 'mysql2/promise';

// Create a conecction with the Database.
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123123123jp',
    database: 'the_old_libary',
});

export default db;