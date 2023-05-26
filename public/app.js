// Взаємодія з сервером через AJAX-запит
function fetchData() {
  // Виконуємо AJAX-запит до серверу
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      // Отримано успішну відповідь від серверу
      var data = JSON.parse(this.responseText);
      // Використовуйте дані для відображення на сторінці
      // Наприклад, оновити список автомобілів
      updateCarList(data.cars);
    }
  };
  xhttp.open("GET", "/cars", true);
  xhttp.send();
}

// Функція оновлення списку автомобілів
function updateCarList(cars) {
  var carList = document.getElementById("car-list");
  carList.innerHTML = "";

  cars.forEach(function(car) {
    var listItem = document.createElement("li");
    listItem.textContent = car.brand + " " + car.model;
    carList.appendChild(listItem);
  });
}

// Виклик функції для отримання списку автомобілів
fetchData();
