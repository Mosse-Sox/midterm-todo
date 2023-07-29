const db = require('./connection');

const getTodos = () => {
  return db.query('SELECT * FROM to_dos;')
    .then((response) => {
      return response.rows;
    });
};

module.exports = {
  getTodos
};