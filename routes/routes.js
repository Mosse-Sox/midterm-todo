const express = require('express');
const todosRouter = express.Router();
const todosQueries = require('../db/todos-queries');

todosRouter.get('/', (req, res) => {
  todosQueries.getTodos()
    .then((todos) => {
      res.json(todos);
    });
});

todosRouter.post('/', (req, res) => {
  const todoTitle = req.body.todoTitle;

  // call catagorize function to get category
  const category = 1;

  const todo = {
    title: todoTitle,
    category: category
  };

  todosQueries.addTodo(todo)
    .then(result => {
      console.log('Added to the database!');
      res.send(result);
    });
});

module.exports = {
  todosRouter
};