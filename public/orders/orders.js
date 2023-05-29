function orders(connection){
    const readFn = () => {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM orders"
            connection.query(sql, (error, result) =>  {
                if(error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });     
    };

    const createFn = (newOrdersData) => {
        return new Promise((resolve, reject) => {
            if(
                !newOrdersData.customer_id ||
                !newOrdersData.car_id ||
                !newOrdersData.order_number ||
                !newOrdersData.start_date ||
                !newOrdersData.return_date ||
                !newOrdersData.rental_cost
            ) {
                reject(new Error('All damages fields are required'))
            }
    
            const sqlResetAutoIncrement = 'ALTER TABLE orders AUTO_INCREMENT = 1';
            const sqlInsertOrder = 'INSERT INTO orders SET ?';
            connection.query(sqlResetAutoIncrement, (resetError) => {
                if (resetError) {
                  reject(resetError);
                } else {
                  connection.query(sqlInsertOrder, newOrderData, (insertError, result) => {
                    if (insertError) {
                      reject(insertError);
                    } else {
                      const newOrderId = result.insertId;
                      connection.query(
                        'SELECT * FROM orders WHERE order_id = ?',
                        [newOrderId],
                        (selectError, selectResult) => {
                          if (selectError) {
                            reject(selectError);
                          } else {
                            resolve(selectResult[0]);
                          }
                        }
                      );
                    }
                  });
                }
            });
        });
      };

    const updateFn = (orderId, updatedData) => {
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE orders SET ? WHERE order_id = ?';
            connection.query(sql, [updatedData, orderId], (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    connection.query('SELECT * FROM orders WHERE order_id = ?', [orderId], (selectError, selectResult) => {
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

    const deleteFn = (orderId) => {
        return new Promise((resolve, reject) => {
          const sql = 'DELETE FROM orders WHERE order_id = ?';
          connection.query(sql, [orderId], (error, result) => {
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
module.exports = orders;