// Взаємодія з сервером через AJAX-запит
function fetchData() {
  // Виконуємо AJAX-запит до серверу
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      // Отримано успішну відповідь від серверу
      var data = JSON.parse(this.responseText);
      // Використовуйте дані для відображення на сторінці
      // Наприклад, оновити таблицю з даними адміністраторів
      updateAdministratorsTable(data.administrators);
    }
  };
  xhttp.open("GET", "/data", true);
  xhttp.send();
}

// Функція оновлення таблиці з даними адміністраторів
function updateAdministratorsTable(administrators) {
  var tableBody = document.getElementById("administrators-table-body");
  tableBody.innerHTML = "";

  administrators.forEach(function(admin) {
    var row = document.createElement("tr");
    var idCell = document.createElement("td");
    idCell.textContent = admin.admin_id;
    var firstNameCell = document.createElement("td");
    firstNameCell.textContent = admin.first_name;
    var lastNameCell = document.createElement("td");
    lastNameCell.textContent = admin.last_name;
    var phoneCell = document.createElement("td");
    phoneCell.textContent = admin.phone_number;
    var emailCell = document.createElement("td");
    emailCell.textContent = admin.email;

    row.appendChild(idCell);
    row.appendChild(firstNameCell);
    row.appendChild(lastNameCell);
    row.appendChild(phoneCell);
    row.appendChild(emailCell);

    tableBody.appendChild(row);
  });
}

// Виклик функції для отримання даних з бази даних
fetchData();

