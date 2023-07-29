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