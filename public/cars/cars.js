function cars(connection){
    const readFn = () => {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM cars"
            connection.query(sql, (error, result) =>  {
                if(error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });     
    };

    const createFn = (newCarsData) => {
        return new Promise((resolve, reject) => {
            if(
                !newCarsData.brand ||
                !newCarsData.model ||
                !newCarsData.year ||
                !newCarsData.license_plate ||
                !newCarsData.category ||
                !newCarsData.rental_rate_per_hour
            ) {
                reject(new Error('All cars fields are required'))
            }
    
            const sql = 'INSERT INTO cars SET ?';
            connection.query(sql, newCarsData, (error, result) => {
                if (error) {
                reject(error);
                } else {
                    const newCarId = result.insertId;
                    connection.query (
                        'SELECT * FROM cars WHERE car_id = ?',
                        [newCarId],
                        (selectError, selectResult) => {
                            if (selectError) {
                                reject(selectError);
                            } else {
                                resolve(selectResult[0]);
                            }
                        }
                    )    
                }
          });
        });
      };

    const updateFn = (carId, updatedData) => {
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE cars SET ? WHERE car_id = ?';
            connection.query(sql, [updatedData, carId], (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    connection.query('SELECT * FROM cars WHERE car_id = ?', [carId], (selectError, selectResult) => {
                        if(selectError) {
                            reject(selectError);
                        } else {
                            resolve(selectResult);
                        }

                    });
                };
            });
        });
    }

    const deleteFn = (carId) => {
        return new Promise((resolve, reject) => {
          const sql = 'DELETE FROM cars WHERE car_id = ?';
          connection.query(sql, [carId], (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          });
        });
      };
      
    return {
        create: createFn,
        read: readFn,   
        update: updateFn,
        delete: deleteFn,
    };
}
module.exports = cars;