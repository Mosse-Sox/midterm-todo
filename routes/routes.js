const express = require('express');
const todosRouter = express.Router();
const todosQueries = require('../db/todos-queries');

todosRouter.get('/', (req, res) => {
  todosQueries.getTodos()
    .then((todos) => {
      res.json(todos);
    });
});

module.exports = {
  todosRouter
};

router.post('/', (req, res) => {
  const todoTitle = req.body.todoTitle

  // call catagorize function to get category
  const category = 1;

  const todo = {
    title: todoTitle,
    category: category
  }

  todosQueries.addTodo(todo)
   .then(result => {
    res.send('Added to the database!')
   });
});