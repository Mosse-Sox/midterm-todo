/* eslint-disable camelcase */
/* eslint-disable indent */
const { response } = require("express");
const db = require("../connection");

/**
 * This function queries the db for all todos
 * @returns a promise
 */
const getTodos = () => {
  return db.query("SELECT * FROM to_dos ORDER BY created_at;").then((response) => {
    return response.rows;
  });
};

/**
 * This function queries the db to add a todo
 * @param {Object} todo an object with the todo data
 * @returns a promise
 */
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

/**
 * This function queries the db to delete a todo
 * @param {String} todo_id string representing todos id
 * @returns a promise
 */
const deleteTodo = (todo_id) => {
  return db
    .query("DELETE FROM to_dos WHERE to_dos.id = $1", [todo_id])
    .then((response) => {
      console.log(response);
      return response;
    });
};


/**
 * This function updates a todos completed_at column
 * @param {String} completed_status string representing if a todo is completed or not ('true', 'false')
 * @param {String} todo_id string representing todos id
 * @returns a promise
 */
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

/**
 * This function updates a todos category_id column
 * @param {String} todoId string representing todos id
 * @param {String} newCategory a string representing the new category for the todo
 * @returns a promise
 */
const updateTodoCategory = function (todoId, newCategory) {
  return db
  .query("UPDATE to_dos SET category_id = $1 WHERE id = $2", [newCategory, todoId])
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
