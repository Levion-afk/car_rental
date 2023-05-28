function customers(connection){
    const readFn = () => {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM customers"
            connection.query(sql, (error, result) =>  {
                if(error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });     
    };

    const createFn = (newCustomerData) => {
        return new Promise((resolve, reject) => {
            if(
                !newCustomerData.first_name ||
                !newCustomerData.last_name ||
                !newCustomerData.phone_number ||
                !newCustomerData.email ||
                !newCustomerData.passport_data
            ) {
                reject(new Error('All customer fields are required'))
            }
    
            const sql = 'INSERT INTO customers SET ?';
            connection.query(sql, newCustomerData, (error, result) => {
                if (error) {
                reject(error);
                } else {
                    const newCustomerId = result.insertId;
                    connection.query (
                        'SELECT * FROM customers WHERE customer_id = ?',
                        [newCustomerId],
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

    const updateFn = (customerId, updatedData) => {
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE customers SET ? WHERE customer_id = ?';
            connection.query(sql, [updatedData, customerId], (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    connection.query('SELECT * FROM customers WHERE customer_id = ?', [customerId], (selectError, selectResult) => {
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

    const deleteFn = (customerId) => {
        return new Promise((resolve, reject) => {
          const sql = 'DELETE FROM customers WHERE customer_id = ?';
          connection.query(sql, [customerId], (error, result) => {
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
module.exports = customers;

