const express = require("express");
const todosRouter = express.Router();
const todosQueries = require("../db/queries/todos-queries");

todosRouter.get("/", (req, res) => {
  todosQueries
    .getTodos()
    .then((todos) => {
      res.json(todos);
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

todosRouter.post("/", (req, res) => {
  const todoName = req.body.name;
  console.log(todoName);
  // call catagorize function to get category
  const category = 1;

  const todo = {
    name: todoName,
    category: category,
  };

  todosQueries
    .addTodo(todo)
    .then((result) => {
      console.log(result);
      res.status(201).send();
    })
    .catch((err) => {
      console.error(err.message);
    });
});

module.exports = todosRouter;
