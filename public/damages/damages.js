function damages(connection){
    const readFn = () => {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM damages"
            connection.query(sql, (error, result) =>  {
                if(error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });     
    };

    const createFn = (newDamageData) => {
        return new Promise((resolve, reject) => {
            if(
                !newDamageData.car_id ||
                !newDamageData.damage_description ||
                !newDamageData.date ||
                !newDamageData.repair_cost
            ) {
                reject(new Error('All damage fields are required'))
            }
            
            const sqlResetAutoIncrement = 'ALTER TABLE damages AUTO_INCREMENT = 1';
            const sqlInsertDamage = 'INSERT INTO damages SET ?';
            connection.query(sqlResetAutoIncrement, (resetError) => {
                if (resetError) {
                  reject(resetError);
                } else {
                  connection.query(sqlInsertDamage, newDamageData, (insertError, result) => {
                    if (insertError) {
                      reject(insertError);
                    } else {
                      const newDamageId = result.insertId;
                      connection.query(
                        'SELECT * FROM damages WHERE damage_id = ?',
                        [newDamageId],
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

    const updateFn = (damageId, updatedData) => {
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE damages SET ? WHERE damage_id = ?';
            connection.query(sql, [updatedData, damageId], (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    connection.query('SELECT * FROM damages WHERE damage_id = ?', [damageId], (selectError, selectResult) => {
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

    const deleteFn = (damageId) => {
        return new Promise((resolve, reject) => {
          const sql = 'DELETE FROM damages WHERE damage_id = ?';
          connection.query(sql, [damageId], (error, result) => {
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
module.exports = damages;