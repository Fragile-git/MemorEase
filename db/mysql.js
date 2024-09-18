
const mysql = require('mysql2');

const { // Destrcuture environment variables    
  MYSQL_USER: user,
  MYSQL_PASSWORD: password,
  MYSQL_DATABASE: database
} = process.env;

let pool; // Global Variable 

async function init() { // Create database if not yet created 

  pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user,
    password
  });

  return new Promise((resolve, reject) => {
    pool.query(`CREATE database IF NOT EXISTS ${database}`, (err) => {
      if (err) return reject(err)

      pool.query(`USE ${database}`, () => { // Use the database

        pool.query(`CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(255),
        last_name VARCHAR(255),
        email VARCHAR(255),
        password VARCHAR(255)
        )`, (err) => {
          if (err) return reject(err)
          resolve();
        });
      });
    });
  });
}

async function login(user, password) { // Login function
  return new Promise((resolve, reject) => {
    pool.query('SELECT id FROM users WHERE email = ? AND password = ?', [user, password], (err, results) => {
      if (err) return reject(err);
      console.log(results);
      resolve(results);
    }
    );
  });
}

async function signup(first_name, last_name, user, password) { // Signup function to created records
  return new Promise((resolve, reject) => {
    pool.query('INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)', [first_name, last_name, user, password], (err, results) => {
      if (err) return reject(err);
      console.log(results);
      resolve(results);
    }
    );
  });
}

async function end() { // end the connection
  return new Promise((resolve, reject) => {
    pool.end(err => {
      if (err) reject(err);
      else resolve();
    });
  });
}


// Used to test the database connection and functions: 

// async function sleep(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

// (async () => {
//   await init();
//   console.log('Database initialized');
//   await signup('Agustin', 'Fermin', 'agfermin@gmail.com', 'password');
//   await login('agvfermin@gmail.com', 'password');
//   await sleep(5000);
//   await end();
//   console.log('Database connection closed');
// })(); 



