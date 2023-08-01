/* eslint-disable camelcase */
/* eslint-disable indent */
const { response } = require("express");
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

const deleteTodo = (todo_id) => {
  return db
    .query("DELETE FROM to_dos WHERE to_dos.id = $1", [todo_id])
    .then((response) => {
      console.log(response);
      return response;
    });
};

const updateTodo = (completed_status, todo_id) => {

  if (completed_status === 'true') {
    console.log('Updating db', completed_status);
    return db
    .query("UPDATE to_dos SET completed_at = CURRENT_TIMESTAMP WHERE id = $1", [todo_id])
    .then((response) => {
      return response;
    });
  }

  return db
    .query("UPDATE to_dos SET completed_at = NULL WHERE id = $1", [todo_id])
    .then((response) => {
      return response;
    });

};

const updateTodoCategory = function (todoId, newCategory) {
  return db
  .query("UPDATE to_dos SET category_id = $1 WHERE id = $2", [todoId, newCategory])
  .then((response) => {
    return response;
  });
};

module.exports = {
  getTodos,
  addTodo,
  deleteTodo,
  updateTodo,
  updateTodoCategory
};
