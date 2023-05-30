const express = require('express');
const mysql = require('mysql');

const app = express();
app.use(express.json());
app.use(express.static('public'));  
const port = 3000;

const customersModule = require('./customers/customers');
const carsModule = require('./cars/cars');
const damagesModule = require('./damages/damages');
const ordersModule  = require('./orders/orders')
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
const damages = damagesModule(connection);
const orders = ordersModule(connection);

//CUSTOMERS
app.get("/customers", (req, res) => {
  customers.read().then(result => {
    res.send(result);
  }).catch(err => {
    console.error(err);
    res.status(500).send(err);
  });
});

app.post("/customers", (req, res) => {
  const newCustomerData = req.body;

  customers.create(newCustomerData).then((newCustomer) => {
    res.json(newCustomer);
  }).catch((err) => {
    res.status(500).json({message: err.message});
  })
})

app.patch("/customers/:id", (req, res) => {
  const customerId = req.params.id;
  const updatedData = req.body;
  customers.update(customerId, updatedData)
    .then(result => {
      console.log("Інформація про клієнта оновлена:", result);
      res.send(result);
    })
    .catch(error => {
      console.error("Помилка оновлення інформації про клієнта:", error);
      res.status(500).send({ error: 'Помилка оновлення інформації про клієнта' });
    });
});

app.delete("/customers/:id", (req, res) => {
  const customerId = req.params.id;
  customers.delete(customerId)
    .then(result => {
      console.log('Клієнт успішно видалений:', result);
      res.send(result);
    })
    .catch(error => {
      console.error('Помилка видалення клієнта:', error);
      res.status(500).send({ error: 'Помилка видалення клієнта' });
    });
});


//CARS
app.get("/cars", (req, res) => {
  cars.read().then(result => {
    res.send(result);
  }).catch(err => {
    console.error(err);
    res.status(500).send(err);
  });
});

app.post("/cars", (req, res) => {
  const newCarData = req.body;

  cars.create(newCarData).then((newCar) => {
    res.json(newCar);
  }).catch((err) => {
    res.status(500).json({message: err.message});
  })
})

app.patch("/cars/:id", (req, res) => {
  const carId = req.params.id;
  const updatedData = req.body;
  cars.update(carId, updatedData)
    .then(result => {
      console.log("Інформація про автомобіль оновлена:", result);
      res.send(result);
    })
    .catch(error => {
      console.error("Помилка оновлення інформації про автомобіль:", error);
      res.status(500).send({ error: 'Помилка оновлення інформації про автомобіль' });
    });
});

app.delete("/cars/:id", (req, res) => {
  const carId = req.params.id;
  cars.delete(carId)
    .then(result => {
      console.log('Автомобіль успішно видалений:', result);
      res.send(result);
    })
    .catch(error => {
      console.error('Помилка видалення автомобіль:', error);
      res.status(500).send({ error: 'Помилка видалення автомобіль' });
    });
});


//DAMAGES
app.get("/damages", (req, res) => {
  damages.read().then(result => {
    res.send(result);
  }).catch(err => {
    console.error(err);
    res.status(500).send(err);
  });
});

app.post("/damages", (req, res) => {
  const newDamageData = req.body;

  damages.create(newDamageData).then((newDamage) => {
    res.json(newDamage);
  }).catch((err) => {
    res.status(500).json({message: err.message});
  })
})

app.patch("/damages/:id", (req, res) => {
  const damageId = req.params.id;
  const updatedData = req.body;
  damages.update(damageId, updatedData)
    .then(result => {
      console.log("Інформація про пошкодження оновлена:", result);
      res.send(result);
    })
    .catch(error => {
      console.error("Помилка оновлення інформації про пошкодження:", error);
      res.status(500).send({ error: 'Помилка оновлення інформації про пошкодження' });
    });
});

app.delete("/damages/:id", (req, res) => {
  const damageId = req.params.id;
  damages.delete(damageId)
    .then(result => {
      console.log('Пошкодження успішно видалений:', result);
      res.send(result);
    })
    .catch(error => {
      console.error('Помилка видалення пошкодження:', error);
      res.status(500).send({ error: 'Помилка видалення пошкодження' });
    });
});


//ORDERS
app.get("/orders", (req, res) => {
  orders.read().then(result => {
    res.send(result);
  }).catch(err => {
    console.error(err);
    res.status(500).send(err);
  });
});

app.post("/orders", (req, res) => {
  const newOrderData = req.body;

  orders.create(newOrderData).then((newOrder) => {
    res.json(newOrder);
  }).catch((err) => {
    res.status(500).json({message: err.message});
  })
})

app.patch("/orders/:id", (req, res) => {
  const orderId = req.params.id;
  const updatedData = req.body;
  orders.update(orderId, updatedData)
    .then(result => {
      console.log("Інформація про пошкодження оновлена:", result);
      res.send(result);
    })
    .catch(error => {
      console.error("Помилка оновлення інформації про пошкодження:", error);
      res.status(500).send({ error: 'Помилка оновлення інформації про пошкодження' });
    });
});

app.delete("/orders/:id", (req, res) => {
  const orderId = req.params.id;
  orders.delete(orderId)
    .then(result => {
      console.log('Пошкодження успішно видалений:', result);
      res.send(result);
    })
    .catch(error => {
      console.error('Помилка видалення пошкодження:', error);
      res.status(500).send({ error: 'Помилка видалення пошкодження' });
    });
});


// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущений на порті ${port}`);
});
