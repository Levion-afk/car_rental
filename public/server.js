const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Підключення до бази даних
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'carrental'
});

// Підключення до бази даних
connection.connect((err) => {
  if (err) {
    console.error('Помилка підключення до бази даних: ' + err.stack);
    return;
  }
  console.log('Підключено до бази даних з ідентифікатором ' + connection.threadId);
});

// Обробка GET-запиту на отримання даних з бази даних
app.get('/data', (req, res) => {
  connection.query('SELECT * FROM administrators', (error, results) => {
    if (error) {
      console.error('Помилка запиту до бази даних: ' + error.stack);
      res.status(500).send('Помилка сервера');
      return;
    }
    res.json({ administrators: results });
  });
});

// Запуск сервера
app.listen(port, () => {
  console.log('Сервер запущено на порту ' + port);
});
