function cars(connection){
    const readFn = () => {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM cars";
            connection.query(sql, (error, result) =>  {
                if(error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    };

    const createFn = (carsData) => {
        return new Promise((resolve, reject) => {
            const { car_id, brand, model, year, license_plate, category, rental_rate_per_hour} = customerData;
    
            const sql = 'INSERT INTO cars (car_id, brand, model, year, license_plate, category, rental_rate_per_hour) VALUES (?, ?, ?, ?, ?, ?)';
            connection.query(sql, [car_id, brand, model, year, license_plate, category, rental_rate_per_hour], (error, result) => {
                if (error) {
                reject(error);
                } else {
                resolve(result.insertId);
                }
          });
        });
      };



    return {
        create: createFn,
        read: readFn,
        update: () => {},
        delete: () => {}
    };
}
module.exports = cars;