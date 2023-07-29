const express = require('express');
const todosRouter = express.Router();
const todosQueries = require('../db/todos-queries');

todosRouter.get('/', (req, res) => {
  todosQueries.getTodos()
    .then((todos) => {
      res.json(todos);
    });
});

router.post('/', (req, res) => {
  const todoName = req.body.todoTitle

  // call catagorize function to get category
  const category = 1;

  const todo = {
    name: todoName,
    category: category
  }

  todosQueries.addTodo(todo)
   .then(result => {
    res.send('Added to the database!')
   });
});

module.exports = {
  todosRouter
};
