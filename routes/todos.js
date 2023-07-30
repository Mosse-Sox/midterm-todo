const express = require("express");
const todosRouter = express.Router();
const todosQueries = require("../db/queries/todos-queries");
const categorize = require("./categories");

todosRouter.get("/", (req, res) => {
  todosQueries
    .getTodos()
    .then((todos) => {
      res.json(todos);
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

todosRouter.post("/", (req, res) => {
  const todoName = req.body.name;
  // call catagorize function to get category
  categorize(todoName)
    .then((category) => {
      const todo = {
        name: todoName,
        category: category,
      };

      todosQueries.addTodo(todo).then((result) => {
        res.status(201).send();
      });
    })
    .catch((err) => {
      console.error(err.message);
    });
});

module.exports = todosRouter;
