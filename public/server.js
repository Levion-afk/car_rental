const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

const customersModule = require('./customers/customers');
const carsModule = require('./cars/cars')
// Підключення до бази даних
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'carrental'
});

// Підключення до бази даних
connection.connect((err) => {
  if (err) {
    console.error('Помилка підключення до бази даних:', err);
    return;
  }
  console.log('Підключено до бази даних!');
});

const customers = customersModule(connection);
const cars = carsModule(connection);

const newCustomer = {
  customer_id: 6,
  first_name: 'Bill',
  last_name: 'Dee',
  phone_number: '1234567890',
  email: 'client6@gmail.com',
  passport_data: 'AB223456',
};

const customerId = 1;
const updatedData = {
  first_name: 'Mike',
  email: 'newemail@gmail.com',
};

//CUSTOMERS
app.get("customers", (req, res) => {
  customers.read().then(result => {
    res.send(result);
  }).catch(err => {
    console.error(err);
    res.status(500).send(err);
  });
  
  customers.create(newCustomer)
  .then(insertId => {
    console.log('Новий клієнт доданий з ідентифікатором:', insertId);
  })
  .catch(error => {
    console.error('Помилка додавання нового клієнта:', error);
  });


  customers.update(customerId, updatedData)
  .then(result => {
    console.log('Інформація про клієнта оновлена:', result);
  })
  .catch(error => {
    console.error('Помилка оновлення інформації про клієнта:', error);
  });
});

const newCar = {
  car_id: 6,
  brand: 'Hynday',
  model: 'Accent',
  year: '2011',
  license_plate: 'ABC223' ,
  category: 'Sedan',
  rental_rate_per_hour: 15.10
}


//CARS
app.get("cars", (req, res) => {
  cars.read().then(result => {
    res.send(result);
  }).catch(err => {
    console.error(err);
    res.status(500).send(err);
  });
  
  cars.create(newCar)
  .then(insertId => {
    console.log('Новий автомобіль доданий з ідентифікатором:', insertId);
  })
  .catch(error => {
    console.error('Помилка додавання нового автомобіля:', error);
  });

});

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущений на порті ${port}`);
});
