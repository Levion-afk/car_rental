
// Функція для створення HTML-таблиці з даними
function createTable(data) {
  const table = document.createElement('table');
  const tableHead = document.createElement('thead');
  const tableBody = document.createElement('tbody');

  // Створення заголовку таблиці
  const headers = Object.keys(data[0]);
  const headerRow = document.createElement('tr');
  headers.forEach(header => {
    const th = document.createElement('th');
    th.textContent = header;
    headerRow.appendChild(th);
  });
  tableHead.appendChild(headerRow);

  // Створення рядків таблиці з даними
  data.forEach(rowData => {
    const row = document.createElement('tr');
    headers.forEach(header => {
      const cell = document.createElement('td');
      cell.textContent = rowData[header];
      row.appendChild(cell);
    });
    tableBody.appendChild(row);
  });

  table.appendChild(tableHead);
  table.appendChild(tableBody);

  return table;
}

// Функція для відображення даних на сторінці
function displayData(endpoint, containerId) {
  fetch(endpoint)
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById(containerId);
      const table = createTable(data);
      container.appendChild(table);
    })
    .catch(error => {
      console.error(`Помилка отримання даних для ${endpoint}:`, error);
    });
}

// Отримання та відображення даних клієнтів
displayData('/customers', 'customers');

// Отримання та відображення даних автомобілів
displayData('/cars', 'cars');

// Отримання та відображення даних пошкоджень
displayData('/damages', 'damages');

// Отримання та відображення даних замовлень
displayData('/orders', 'orders');

document.getElementById('customerForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Зупиняє перезавантаження сторінки при натисканні кнопки submit

  const form = document.getElementById('customerForm');
  const formData = new FormData(form);

  const customerData = {};
  formData.forEach(function(value, key) {
    customerData[key] = value;
  });

  fetch('/customers', {
    method: 'POST',
    body: JSON.stringify(customerData),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => {
    // Очистити форму або вивести повідомлення про успішне створення клієнта
    form.reset();
    location.reload();
    alert('Клієнта створено успішно!');
  })
  .catch(error => {
    // Вивести повідомлення про помилку при створенні клієнта
    console.error('Помилка при створенні клієнта:', error);
    alert('Сталася помилка при створенні клієнта');
  });
});



