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

    const createFn = (customerData) => {
        return new Promise((resolve, reject) => {
            const { customer_id, first_name, last_name, phone_number, email, passport_data} = customerData;
    
            const sql = 'INSERT INTO customers (customer_id, first_name, last_name, phone_number, email, passport_data) VALUES (?, ?, ?, ?, ?, ?)';
            connection.query(sql, [customer_id, first_name, last_name, phone_number, email, passport_data], (error, result) => {
                if (error) {
                reject(error);
                } else {
                resolve(result.insertId);
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
                    resolve(result);
                }
            });
        });
    }



    return {
        create: createFn,
        read: readFn,
        update: updateFn,
        delete: () => {},
    };
}
module.exports = customers;

