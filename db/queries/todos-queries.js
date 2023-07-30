const db = require("../connection");

const getTodos = () => {
  return db.query("SELECT * FROM to_dos;").then((response) => {
    return response.rows;
  });
};

const addTodo = (todo) => {
  return db
    .query("INSERT INTO to_dos (name, category_id) VALUES ($1, $2)", [
      todo.name,
      todo.category,
    ])
    .then((response) => {
      return response;
    });
};

module.exports = {
  getTodos,
  addTodo,
};
